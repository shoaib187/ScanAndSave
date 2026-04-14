import React from 'react';
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

const REGIONS = [
  {
    id: '1',
    currency: 'USD',
    symbol: '$',
    Icon: <BadgeDollarSign />,
    title: 'United States',
    subtitle: 'US Dollar - USD - $',
  },
  {
    id: '2',
    currency: 'GBP',
    symbol: '£',
    Icon: <Landmark />,
    title: 'United Kingdom',
    subtitle: 'British Pound - GBP - £',
  },
  {
    id: '3',
    currency: 'PKR',
    symbol: '₨',
    Icon: <ReceiptIndianRupee />,
    title: 'Pakistan',
    subtitle: 'Pakistani Rupee - PKR - ₨',
  },
  {
    id: '4',
    currency: 'CAD',
    symbol: 'C$',
    Icon: <DollarSign />,
    title: 'Canada',
    subtitle: 'Canadian Dollar - CAD - C$',
  },
];

export default function RegionSelection() {
  const renderItem = ({ item }) => (
    <PrefrencesButton
      title={item.title}
      subtitle={item.subtitle}
      icon={item.icon}
      currency={item.currency}
      symbol={item.symbol}
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