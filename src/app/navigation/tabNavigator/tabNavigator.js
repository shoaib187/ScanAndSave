import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Scan, History, Camera, User } from 'lucide-react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// Import your custom stacks
import { ScanStack } from '../scanStack/scanStack';
import { HistoryStack } from '../historyStack/historyStack';
import { ProfileStack } from '../profileStack/profileStack';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#333',
        tabBarInactiveTintColor: '#AAA',
        tabBarStyle: {
          display: shouldShowTabBar(route) ? 'flex' : 'none',
          backgroundColor: '#FFF',
          borderTopWidth: 0,
          elevation: 10,
          height: 60,
          paddingBottom: 10,
        },
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Scan') {
            return <Scan color={color} size={size} />;
          } else if (route.name === 'Scanner') {
            return <Camera color={color} size={size} />;
          } else if (route.name === 'History') {
            return <History color={color} size={size} />;
          }
          else if (route.name === 'Profile') {
            return <User color={color} size={size} />;
          }
        },
      })}
    >
      <Tab.Screen
        name="Scan"
        component={ScanStack}
        options={{ tabBarLabel: 'Home' }}
      />

      <Tab.Screen
        name="History"
        component={HistoryStack}
        options={{ tabBarLabel: 'History' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

const shouldShowTabBar = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  const hiddenScreens = [
    'ScanResults',
    'Scanner',
    "PriceAlerts",
    "RegionSelection",
    "Retailers"
  ];

  return !(routeName && hiddenScreens.includes(routeName));
};