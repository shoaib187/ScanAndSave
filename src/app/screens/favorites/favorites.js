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
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: Spacing.medium,
    paddingBottom: Spacing.large,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});