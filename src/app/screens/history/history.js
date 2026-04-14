import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
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

const HISTORY_DATA = [
  { id: '1', title: 'Sony WH-1000XM5', subtitle: 'Scanned 2 min ago · Electronics', price: '$289', icon: Headphones },
  { id: '2', title: 'Apple Watch Series 9', subtitle: 'Yesterday · Wearables', price: '$329', icon: Watch },
  { id: '3', title: 'Canon EOS R50', subtitle: '3 days ago · Cameras', price: '$679', icon: Camera },
  { id: '4', title: 'PS5 DualSense Controller', subtitle: 'Last week · Gaming', price: '$59', icon: Gamepad2 },
  { id: '5', title: 'Philips Hue Starter Kit', subtitle: '2 weeks ago · Smart Home', price: '$189', icon: Lightbulb },
];

export default function History() {
  const [activeTab, setActiveTab] = useState('Recents');

  const renderHistoryItem = ({ item }) => <HistoryCard item={item} />;

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
          data={HISTORY_DATA}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Favorites HISTORY_DATA={HISTORY_DATA} />
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
    paddingTop: Spacing.small,
    marginBottom: Spacing.large,
  },

  backButton: {
    backgroundColor: '#FFF',
    width: Responsive.width(45),
    height: Responsive.width(45),
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