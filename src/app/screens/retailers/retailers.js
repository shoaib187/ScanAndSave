import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/common/header/header';
import RetailerCard from '../../components/common/retailerCard/retailerCard';
import { useRetailers } from '../../../hooks/useRetailers/useRetailers';
import { usePreferences } from '../../../hooks/usePreferences/usePreferences';
import { useUpdatePreferences } from '../../../hooks/usePreferences/usePreferences';
import { useNavigation } from '@react-navigation/native';

// Map slug → local icon since logo is null from API
const RETAILER_ICONS = {
  amazon: require('../../../../assets/png/amazon.png'),
  walmart: require('../../../../assets/png/wallmart.png'),
  target: require('../../../../assets/png/target.png'),
  ebay: require('../../../../assets/png/ebay.png'),
  bestbuy: require('../../../../assets/png/trade.png'),
};

export default function Retailers() {
  const navigation = useNavigation();
  const { data: retailersData, isLoading, isError } = useRetailers();
  const { data: preferences } = usePreferences();
  const { mutate: updatePreferences, isPending } = useUpdatePreferences();

  const retailers = retailersData?.data || [];
  const currentRetailer = preferences?.data?.default_retailer || preferences?.default_retailer;

  const handleSelect = (item) => {
    updatePreferences(
      {
        region: preferences?.data?.region || preferences?.region,
        currency: preferences?.data?.currency || preferences?.currency,
        currency_symbol: preferences?.data?.currency_symbol || preferences?.currency_symbol,
        default_retailer: item.slug,
      },
      {
        onSuccess: () => navigation.goBack(),
      }
    );
  };

  const renderItem = ({ item }) => (
    <RetailerCard
      item={{
        ...item,
        icon: RETAILER_ICONS[item.slug] || null, // inject local icon by slug
      }}
      isSelected={currentRetailer === item.slug}
      disabled={isPending}
      onPress={() => handleSelect(item)}
    />
  );

  const renderEmpty = () => {
    if (isLoading) return <ActivityIndicator style={styles.center} color="#000" />;
    if (isError) return <Text style={styles.errorText}>Failed to load retailers.</Text>;
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack title="Default Retailers" />
      <View style={styles.content}>
        <Text style={styles.title}>Choose Retailer</Text>
        <FlatList
          data={retailers}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F1E8',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
    marginBottom: 20,
  },
  center: {
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});