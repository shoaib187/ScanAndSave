import React from 'react'
import { AuthProvider } from './src/configs/authContext/authContext';
import { AppNavigator } from './src/app/navigation/appNavigator/appNavigator';

export default function App() {
  return <AuthProvider>
    <AppNavigator />
  </AuthProvider>
}