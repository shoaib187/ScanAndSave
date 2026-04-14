import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from '../../../constants/screens';

const Stack = createNativeStackNavigator();

export const HistoryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#EFEFE6' },
        headerTintColor: '#333',
        headerShadowVisible: false,
        headerShown: false
      }}
    >
      <Stack.Screen
        name="HistoryList"
        component={screens.History}
      />
    </Stack.Navigator>
  );
};
