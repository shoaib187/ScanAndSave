import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../../components/common/header/header';
import { Radius } from '../../../constants/styles';
import RetailerCard from '../../components/common/retailerCard/retailerCard';

const RETAILERS = [
  {
    id: 'amazon',
    name: 'Amazon',
    description: 'Prime eligible - Fastest Delivery',
    icon: require('../../../../assets/png/amazon.png'),
  },
  {
    id: 'walmart',
    name: 'Walmart',
    description: 'Free shipping on $35+ Orders',
    icon: require('../../../../assets/png/wallmart.png'),
  },
  {
    id: 'target',
    name: 'Target',
    description: 'Same-day pickup available',
    icon: require('../../../../assets/png/target.png'),
  },
  {
    id: 'ebay',
    name: 'eBay',
    description: 'New & used - Global sellers',
    icon: require('../../../../assets/png/ebay.png'),
  },
];

export default function Retailers() {
  const [selectedId, setSelectedId] = useState('amazon');

  const renderItem = ({ item }) => (
    <RetailerCard
      item={item}
      isSelected={item.id === selectedId}
      onPress={() => setSelectedId(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack title="Default Retailers" />

      <View style={styles.content}>
        <Text style={styles.title}>Choose Retailer</Text>

        <FlatList
          data={RETAILERS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
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
});