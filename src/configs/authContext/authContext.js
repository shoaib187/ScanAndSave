import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Keychain from 'react-native-keychain';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        const { userData, expiry } = JSON.parse(credentials.password);
        const now = Date.now();

        if (now < expiry) {
          setUser(userData);
          setToken(credentials.username);
        } else {
          await logout();
        }
      }
    } catch (error) {
      console.error("Keychain load error:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData, authToken) => {
    try {
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
      const expiryDate = Date.now() + thirtyDaysInMs;

      const storageObject = JSON.stringify({
        userData: userData,
        expiry: expiryDate,
      });

      // Save to secure storage
      await Keychain.setGenericPassword(authToken, storageObject);

      // Update state for instant access
      setToken(authToken);
      setUser(userData);
    } catch (error) {
      console.error("Login storage error:", error);
    }
  };

  const logout = async () => {
    try {
      await Keychain.resetGenericPassword();
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);