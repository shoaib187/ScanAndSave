import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { screens } from '../../../constants/screens';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Onboarding');

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const result = await Keychain.getGenericPassword({
          service: 'com.scanandsave.onboarding',
        });

        if (result && result.password === 'completed') {
          setInitialRoute('Login');
        }
      } catch (error) {
        console.log("Check Onboarding Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboarding();
  }, []);

  if (isLoading) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFEFE6'
      }}>
        <ActivityIndicator size="large" color={"#333"} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={screens.OnboardingScreen} />
      <Stack.Screen name="Login" component={screens.Login} />
      <Stack.Screen name="Signup" component={screens.Signup} />
      <Stack.Screen name="ForgotPassword" component={screens.ForgotPassword} />
    </Stack.Navigator>
  );
}