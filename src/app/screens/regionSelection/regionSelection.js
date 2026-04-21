import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Searchbar from '../../components/common/searchbar/searchbar';
import PrefrencesButton from '../../components/common/prefrencesButton/prefrencesButton';
import Header from '../../components/common/header/header';
import { colors } from '../../../constants/colors';
import { Spacing } from '../../../constants/styles';
import { useUpdatePreferences, usePreferences } from '../../../hooks/usePreferences/usePreferences';
import { useNavigation } from '@react-navigation/native';
import { useRegions } from '../../../hooks/useRegions/useRegions';

export default function RegionSelection() {
  const navigation = useNavigation();

  const { data: regionsData, isLoading, isError } = useRegions({
    limit: 100
  });
  const { mutate: updatePreferences } = useUpdatePreferences();
  const { data: preferences } = usePreferences();
  // console.log("preferences", preferences);

  const regions = regionsData?.data || [];

  const handleSelect = (item) => {
    updatePreferences(
      {
        region: item.code,
        currency: item.currency_code,
        currency_symbol: item.currency_symbol,
        default_retailer: preferences?.data?.default_retailer,
      },
      {
        onSuccess: () => navigation.goBack(),
      }
    );
  };

  const renderItem = ({ item }) => (
    <PrefrencesButton
      currency_symbol={item?.currency_code}
      onPress={() => handleSelect(item)}
      currency={item?.name}
      region={item?.currency_name}
      symbol={item?.currency_symbol}
      wrapperStyle={{ marginHorizontal: 0 }}
    />
  );

  const renderEmpty = () => {
    if (isLoading) return <ActivityIndicator style={styles.center} color={colors.primary} />;
    if (isError) return <Text style={styles.errorText}>Failed to load regions.</Text>;
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack title={"Region & Currency"} />
      {isLoading ? <View style={styles.center}>
        <ActivityIndicator size={40} color={colors.black} />
        <Text>Loading...</Text>
      </View> :
        <FlatList
          data={regions}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={<Searchbar />}
          ListEmptyComponent={renderEmpty}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: Spacing.medium,
  },

  errorText: {
    textAlign: 'center',
    marginTop: Spacing.large,
    color: colors.secondary,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});