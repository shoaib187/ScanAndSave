import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Clock, ChevronRight } from 'lucide-react-native';

const Stack = createNativeStackNavigator();

// --- Dummy Data ---
const MOCK_HISTORY = [
  { id: '1', title: 'Grocery Store', date: '2026-04-10', amount: '$45.00' },
  { id: '2', title: 'Tech Hub', date: '2026-04-12', amount: '$120.50' },
  { id: '3', title: 'Coffee Shop', date: '2026-04-13', amount: '$5.75' },
];

// --- Dummy Page 1: History List ---
const HistoryList = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => navigation.navigate('HistoryDetail', { item })}
    >
      <View style={styles.iconCircle}>
        <Clock size={20} color="#666" />
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDate}>{item.date}</Text>
      </View>
      <Text style={styles.amount}>{item.amount}</Text>
      <ChevronRight size={20} color="#CCC" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_HISTORY}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
};

// --- Dummy Page 2: History Detail ---
const HistoryDetail = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.detailContainer}>
      <View style={styles.receiptCard}>
        <Text style={styles.detailLabel}>Transaction Amount</Text>
        <Text style={styles.detailAmount}>{item.amount}</Text>
        <View style={styles.divider} />
        <Text style={styles.detailText}>Vendor: {item.title}</Text>
        <Text style={styles.detailText}>Date: {item.date}</Text>
        <Text style={styles.detailText}>Status: Completed</Text>
      </View>
    </View>
  );
};

// --- The Exported Stack Component ---
export const HistoryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#EFEFE6' },
        headerTintColor: '#333',
        headerShadowVisible: false, // Cleaner look for history
      }}
    >
      <Stack.Screen
        name="HistoryList"
        component={HistoryList}
        options={{ title: 'Activity History' }}
      />
      <Stack.Screen
        name="HistoryDetail"
        component={HistoryDetail}
        options={{ title: 'Details' }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  listPadding: {
    padding: 15,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFEFE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemDate: {
    fontSize: 12,
    color: '#888',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  detailContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EFEFE6',
    justifyContent: 'center',
  },
  receiptCard: {
    backgroundColor: '#FFF',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  detailLabel: {
    color: '#888',
    fontSize: 14,
  },
  detailAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#EEE',
    marginVertical: 20,
  },
  detailText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
  }
});