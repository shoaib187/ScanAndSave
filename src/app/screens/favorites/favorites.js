import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import HistoryCard from '../../components/common/historyCard/historyCard';
import { Spacing } from '../../../constants/styles';

export default function Favorites({ HISTORY_DATA }) {
  const renderHistoryItem = ({ item }) => <HistoryCard item={item} />;
  return (
    <FlatList
      data={HISTORY_DATA}
      renderItem={renderHistoryItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  )
}


const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: Spacing.medium,
    paddingBottom: Spacing.large,
  }
});