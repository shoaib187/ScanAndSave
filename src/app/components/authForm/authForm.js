import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Radius, Spacing } from '../../../constants/styles';
import { colors } from '../../../constants/colors';
import InputField from '../common/inputField/inputField';
import Button from '../common/button/iconButton';
import { useAuth } from '../../../configs/authContext/authContext';

export default function AuthForm() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  // 1. Manage Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  // 2. Handle Input Changes
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // 3. Toggle Form Type
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ fullName: '', email: '', password: '' }); // Clear form on toggle
  };

  // 4. Submit Logic
  const handleSubmit = async () => {
    const { email, password, fullName } = formData;

    // Simple Validation
    if (!email || !password || (!isLogin && !fullName)) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      // Mocking an API call / Backend Logic
      // In a real app: const response = await api.post(isLogin ? '/login' : '/signup', formData);

      const dummyUser = {
        email: email,
        name: isLogin ? "Returning User" : fullName
      };
      const dummyToken = "abc-123-secure-token";
      await login(dummyUser, dummyToken);

    } catch (error) {
      Alert.alert("Auth Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.formWrapper}>
      {!isLogin && (
        <InputField
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChangeText={(val) => handleInputChange('fullName', val)}
        />
      )}

      <InputField
        label="Email"
        placeholder="Enter email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={formData.email}
        onChangeText={(val) => handleInputChange('email', val)}
      />

      <InputField
        label="Password"
        placeholder="Enter password"
        secureTextEntry
        value={formData.password}
        onChangeText={(val) => handleInputChange('password', val)}
      />

      {isLogin && (
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      )}

      <Button
        label={isLogin ? "Log in" : "Sign up"}
        size='large'
        onPress={handleSubmit}
        loading={loading} // Pass loading state to button if supported
      />

      <Button
        style={styles.button}
        label={isLogin ? "Don't have an Account? Sign up" : "Already have an account? Login"}
        variant='outline'
        onPress={toggleForm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    // flex: 0.5,
    borderRadius: Radius.large * 3,
    backgroundColor: colors.white,
    marginHorizontal: Spacing.small,
    padding: Spacing.large,
  },
  forgotPassword: {
    marginBottom: Spacing.medium,
    alignSelf: 'flex-end',
  },
  forgotText: {
    color: colors.primary || '#333',
    fontWeight: '500',
  },
  button: {
    marginTop: Spacing.small,
  }
});