import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from '../../../constants/screens';

const Stack = createNativeStackNavigator();
export const ScanStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ScanHome" component={screens.ScanMain} />
      <Stack.Screen name="Scanner" component={screens.ScanHome} options={{
        animation: "slide_from_bottom",
      }} />
      <Stack.Screen name="ScanResults" component={screens.ScanResults} />
      <Stack.Screen name="PriceAlerts" component={screens.PriceAlerts} />
      {/* <Stack.Screen name="Profile" component={screens.Profile} /> */}
    </Stack.Navigator>
  );
};
