import React, { useEffect } from 'react'
import { AuthProvider } from './src/configs/authContext/authContext';
import { AppNavigator } from './src/app/navigation/appNavigator/appNavigator';
import BootSplash from "react-native-bootsplash";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 2,
      networkMode: 'online',
    },
  },
});

export default function App() {
  useEffect(() => {
    const init = async () => {
      // Perform any async tasks here (fetching data, checking storage)
    };

    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log("Bootsplash has been hidden successfully");
    });
  }, []);
  return <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  </QueryClientProvider>
}

