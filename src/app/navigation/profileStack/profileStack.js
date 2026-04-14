import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from '../../../constants/screens';
const Stack = createNativeStackNavigator();

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={screens.Profile} />
      <Stack.Screen name="PriceAlerts" component={screens.PriceAlerts} />
      <Stack.Screen name="RegionSelection" component={screens.RegionSelection} />
      <Stack.Screen name="Retailers" component={screens.Retailers} />
    </Stack.Navigator>
  );
};
