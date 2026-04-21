import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import React from 'react'
import HistoryCard from '../../components/common/historyCard/historyCard';
import { Spacing } from '../../../constants/styles';
import { useFavorites } from '../../../hooks/useFavorites/useFavorites';

export default function Favorites() {
  const { data: favoritesData, isRefetching, refetch } = useFavorites();
  const favorites = favoritesData?.data || [];
  console.log("favorites are", favorites);

  const renderHistoryItem = ({ item }) => <HistoryCard item={item} />;

  const handleRefresh = () => {
    refetch();
  }

  return (
    <FlatList
      data={favorites}
      renderItem={renderHistoryItem}
      refreshControl={<RefreshControl onRefresh={handleRefresh} refreshing={isRefetching} />}
      keyExtractor={(item) => item?._id}
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