import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Searchbar from '../../components/common/searchbar/searchbar';
import PrefrencesButton from '../../components/common/prefrencesButton/prefrencesButton';

import {
  BadgeDollarSign,
  Landmark,
  ReceiptIndianRupee,
  DollarSign,
} from 'lucide-react-native';
import Header from '../../components/common/header/header';
import { colors } from '../../../constants/colors';
import { Spacing } from '../../../constants/styles';
import { useUpdatePreferences } from '../../../hooks/usePreferences/usePreferences';
import { useNavigation } from '@react-navigation/native';
import { usePreferences } from '../../../hooks/usePreferences/usePreferences';
import { getAllRegions } from '../../../utils/regions/api';
import { useRegions } from '../../../hooks/useRegions/useRegions';

const REGIONS = [
  {
    id: '1',
    currency: 'USD',
    currency_symbol: '$',
    region: 'US',
    Icon: <BadgeDollarSign />,
    title: 'United States',
    subtitle: 'US Dollar - USD - $',
  },
  {
    id: '2',
    currency: 'GBP',
    currency_symbol: '£',
    region: 'GB',
    Icon: <Landmark />,
    title: 'United Kingdom',
    subtitle: 'British Pound - GBP - £',
  },
  {
    id: '3',
    currency: 'PKR',
    currency_symbol: '₨',
    region: 'PK',
    Icon: <ReceiptIndianRupee />,
    title: 'Pakistan',
    subtitle: 'Pakistani Rupee - PKR - ₨',
  },
  {
    id: '4',
    currency: 'CAD',
    currency_symbol: 'C$',
    region: 'CA',
    Icon: <DollarSign />,
    title: 'Canada',
    subtitle: 'Canadian Dollar - CAD - C$',
  },
];

export default function RegionSelection() {
  const navigation = useNavigation();

  const { data } = useRegions()
  const { mutate: updatePreferences, isPending } = useUpdatePreferences();

  const { data: preferences } = usePreferences();

  console.log("regions", data);

  const currentRegion = preferences?.data?.region || preferences?.region;

  const handleSelect = (item) => {
    updatePreferences(
      {
        region: item.region,
        currency: item.currency,
        currency_symbol: item.currency_symbol,
        default_retailer: preferences?.data?.default_retailer || preferences?.default_retailer,
      },
      {
        onSuccess: () => navigation.goBack(),
      }
    );
  };

  const renderItem = ({ item }) => (
    <PrefrencesButton
      title={item.title}
      subtitle={item.subtitle}
      icon={item.Icon}
      currency={item.currency}
      currency_symbol={item.currency_symbol}
      selected={currentRegion === item.region}  // highlight active region
      disabled={isPending}
      onPress={() => handleSelect(item)}
      wrapperStyle={{ marginHorizontal: 0 }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack title={"Region & Currency"} />
      <FlatList
        data={REGIONS}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Searchbar />}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
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
});