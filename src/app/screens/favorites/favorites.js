import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import HistoryCard from '../../components/common/historyCard/historyCard';
import { Spacing } from '../../../constants/styles';
import { useAddFavorite, useFavorites, useRemoveFavorite } from '../../../hooks/useFavorites/useFavorites';

export default function Favorites({ HISTORY_DATA }) {
  const renderHistoryItem = ({ item }) => <HistoryCard item={item} />;
  const { data: favoritesData, isLoading } = useFavorites();
  const favorites = favoritesData?.data || [];
  console.log("favorites", favorites);

  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: removeFavorite } = useRemoveFavorite();
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