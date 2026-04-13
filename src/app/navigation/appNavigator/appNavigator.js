import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from '../tabNavigator/tabNavigator';
import AuthStack from '../authStack/authStack';
import { useAuth } from '../../../configs/authContext/authContext';
import { StatusBar } from 'react-native';
import { colors } from '../../../constants/colors';

export const AppNavigator = () => {
  const { user } = useAuth();

  const isAuthenticated = !!user;
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      {isAuthenticated ? (
        <TabNavigator />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};