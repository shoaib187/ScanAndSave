import React, { useEffect } from 'react'
import { AuthProvider } from './src/configs/authContext/authContext';
import { AppNavigator } from './src/app/navigation/appNavigator/appNavigator';
import BootSplash from "react-native-bootsplash";

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
  return <AuthProvider>
    <AppNavigator />
  </AuthProvider>
}