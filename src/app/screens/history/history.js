import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl
} from 'react-native';
import {
  ChevronLeft,
  Headphones,
  Watch,
  Camera,
  Gamepad2,
  Lightbulb
} from 'lucide-react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import HistoryCard from '../../components/common/historyCard/historyCard';
import Favorites from '../favorites/favorites';
import { Responsive, FontSize, Spacing, Radius } from '../../../constants/styles';
import { useHistory } from '../../../hooks/useHistory/useHistory';
import ProductDetailsSheet from '../../components/common/productDetailsSheet/productDetailsSheet';


export default function History() {
  const [activeTab, setActiveTab] = useState('Recents')
  const { data: history, refetch, isRefetching } = useHistory();
  const [selectedItem, setSelectedItem] = useState(null); // ← selected history item


  const historyData = history?.data || [];

  const renderHistoryItem = ({ item }) => <HistoryCard
    item={item}
    onPress={() => setSelectedItem(item)}
  />;

  const handleRefresh = () => {
    refetch();
  }
  console.log("History data:", historyData);

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ChevronLeft size={Responsive.width(28)} color="#000" />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerTitle}>Your History</Text>
          <Text style={styles.headerSubtitle}>Items you scanned recently</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Recents' && styles.activeTab]}
          onPress={() => setActiveTab('Recents')}
        >
          <Text style={[styles.tabText, activeTab === 'Recents' && styles.activeTabText]}>
            Recents
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'Favorites' && styles.activeTab]}
          onPress={() => setActiveTab('Favorites')}
        >
          <Text style={[styles.tabText, activeTab === 'Favorites' && styles.activeTabText]}>
            Favorites
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}

      {activeTab === 'Recents' ? (
        <FlatList
          data={historyData}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item?._id}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl onRefresh={handleRefresh} refreshing={isRefetching} />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Favorites />
      )}
      {selectedItem && (
        <ProductDetailsSheet
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F1E8',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
    // paddingTop: Spacing.small,
    marginBottom: Spacing.large,
    height: Responsive.height(50),
  },

  backButton: {
    backgroundColor: '#FFF',
    width: Responsive.width(40),
    height: Responsive.width(40),
    borderRadius: Radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.medium,
  },

  headerTitle: {
    fontSize: FontSize.large,
    fontWeight: '800',
    color: '#000',
  },

  headerSubtitle: {
    fontSize: FontSize.small,
    color: '#666',
    marginTop: Responsive.height(2),
  },

  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.medium,
    gap: Spacing.small,
    marginBottom: Spacing.large,
  },

  tab: {
    flex: 1,
    height: Responsive.height(48),
    borderRadius: Radius.full,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeTab: {
    borderWidth: 1.5,
    borderColor: '#9E7E4D',
  },

  tabText: {
    fontSize: FontSize.medium,
    fontWeight: '700',
    color: '#000',
  },

  activeTabText: {
    color: '#000',
  },

  listContent: {
    paddingHorizontal: Spacing.medium,
    paddingBottom: Spacing.large,
  },
});