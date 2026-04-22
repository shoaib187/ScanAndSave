import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Searchbar from '../../components/common/searchbar/searchbar';
import PrefrencesButton from '../../components/common/prefrencesButton/prefrencesButton';
import Header from '../../components/common/header/header';
import { colors } from '../../../constants/colors';
import { FontSize, Responsive, Spacing } from '../../../constants/styles';
import { useUpdatePreferences, usePreferences } from '../../../hooks/usePreferences/usePreferences';
import { useNavigation } from '@react-navigation/native';
import { useRegions } from '../../../hooks/useRegions/useRegions';
import { LocationEdit } from 'lucide-react-native';

export default function RegionSelection() {
  const navigation = useNavigation();
  const [search, setSearch] = React.useState('');

  const { data: regionsData, isLoading } = useRegions({
    limit: 100
  });
  const { mutate: updatePreferences } = useUpdatePreferences();
  const { data: preferences } = usePreferences();

  const regions = regionsData?.data || [];

  const filteredCities = regions.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

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


  return (
    <SafeAreaView style={styles.container}>
      <Header showBack title={"Region & Currency"} />
      {isLoading ? <View style={styles.center}>
        <ActivityIndicator size={Responsive.width(40)} color={colors.black} />
        <Text>Loading...</Text>
      </View> :
        <FlatList
          data={filteredCities}
          keyExtractor={(item) => item?._id}
          ListHeaderComponent={<Searchbar value={search} onChangeText={setSearch} />}
          ListEmptyComponent={<View style={styles.emptyContainer}>
            <LocationEdit size={Responsive.width(40)} color={colors.secondary} />
            <Text style={styles.emptyText}>No regions found</Text>
          </View>}
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
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Responsive.height(400)
  },
  emptyText: {
    marginTop: Spacing.medium,
    fontSize: FontSize.medium,
    color: colors.secondary,
  }
});