import { useEffect } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '123456789-xxxx.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const handleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      // In v5+, check the response type
      if (response.type === 'success') {
        const idToken = response.data.idToken;
        console.log("Success! Token:", idToken);
        // Send idToken to your backend or Firebase
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Signing in already...");
      } else {
        console.error("Login Error:", error);
      }
    }
  };

  return (
    // Your UI with a login button
    <Button title="Login with Google" onPress={handleLogin} />
  );
}