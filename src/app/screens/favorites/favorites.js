import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HistoryCard from '../../components/common/historyCard/historyCard';
import { Spacing } from '../../../constants/styles';
import { useFavorites } from '../../../hooks/useFavorites/useFavorites';
import { colors } from '../../../constants/colors';

export default function Favorites() {
  const { data: favoritesData, isRefetching, refetch, isLoading } = useFavorites();
  const favorites = favoritesData?.data || [];

  const renderHistoryItem = ({ item }) => <HistoryCard item={item} />;

  const handleRefresh = () => refetch();

  return (
    <>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size={40} color={colors.black} />
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderHistoryItem}
          refreshControl={<RefreshControl onRefresh={handleRefresh} refreshing={isRefetching} />}
          keyExtractor={(item) => item?._id}
          ListEmptyComponent={EmptyFavorites}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}

        />
      )}
    </>
  );
}


const EmptyFavorites = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyTitle}>No Favorites Yet</Text>
    <Text style={styles.emptySubtitle}>
      Start adding items to your favorites and they will appear here
    </Text>
  </View>
);

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: Spacing.medium,
    paddingBottom: Spacing.large,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.xLarge,
    minHeight: 400,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: Spacing.small,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    lineHeight: 20,
  }
});