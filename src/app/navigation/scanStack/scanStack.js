import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from '../../../constants/screens';

const Stack = createNativeStackNavigator();

// --- Page 2: Live Camera View (Dummy) ---
const LiveCamera = ({ navigation }) => {
  return (
    <View style={styles.cameraPlaceholder}>
      <View style={styles.overlay}>
        <View style={styles.scannerFrame} />
        <Text style={styles.guideText}>Align code within the frame</Text>
      </View>

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.closeText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- The Exported Stack ---
export const ScanStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Scan" component={screens.ScanMain} />
      <Stack.Screen name="Scanner" component={screens.ScanHome} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  landingContainer: {
    flex: 1,
    backgroundColor: '#EFEFE6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  iconHeader: {
    marginBottom: 40,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  infoBox: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 40,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
  },
  mainButton: {
    backgroundColor: '#333',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cameraPlaceholder: {
    flex: 1,
    backgroundColor: '#000', // Camera looks best on black
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  guideText: {
    color: '#FFF',
    marginTop: 20,
    fontSize: 14,
  },
  closeButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  closeText: {
    color: '#FFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  }
});