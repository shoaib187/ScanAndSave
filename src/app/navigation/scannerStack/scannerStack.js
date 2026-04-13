import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 1. Create the Stack Navigator instance
const Stack = createNativeStackNavigator();

// --- Dummy Page 1: The Scanner ---
const ScannerHome = ({ navigation }) => (
  <View style={styles.center}>
    <Text style={styles.title}>Camera Scanner View</Text>
    <Text style={styles.subtitle}>[Vision Camera would render here]</Text>
    <Button
      title="Simulate Scan"
      onPress={() => navigation.navigate('ScanResult', { data: 'SKU-12345' })}
    />
  </View>
);

// --- Dummy Page 2: The Result ---
const ScanResult = ({ route, navigation }) => {
  const { data } = route.params || { data: 'No Data' };

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Scan Result</Text>
      <Text style={styles.dataText}>Scanned Code: {data}</Text>
      <Button title="Scan Again" onPress={() => navigation.goBack()} />
    </View>
  );
};

// 2. The Exported Stack Component
export const ScannerStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#EFEFE6' }, // Matching your light theme
        headerTintColor: '#333',
      }}
    >
      <Stack.Screen
        name="ScannerHome"
        component={ScannerHome}
        options={{ title: 'Scan Barcode' }}
      />
      <Stack.Screen
        name="ScanResult"
        component={ScanResult}
        options={{ title: 'Items Details' }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#666',
    marginBottom: 20,
  },
  dataText: {
    fontSize: 18,
    color: 'green',
    marginBottom: 20,
  }
});