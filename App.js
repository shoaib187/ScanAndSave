import React, { useEffect } from 'react'
import { AuthProvider } from './src/configs/authContext/authContext';
import { AppNavigator } from './src/app/navigation/appNavigator/appNavigator';
import BootSplash from "react-native-bootsplash";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 5,
      networkMode: 'online',
    },
  },
});

export default function App() {
  useEffect(() => {
    const init = async () => { };
    init().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);
  return <GestureHandlerRootView style={styles.container}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </QueryClientProvider>
  </GestureHandlerRootView>
}



const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})