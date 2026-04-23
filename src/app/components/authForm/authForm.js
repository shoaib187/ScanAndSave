import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Radius, Spacing } from '../../../constants/styles';
import { colors } from '../../../constants/colors';
import InputField from '../common/inputField/inputField';
import Button from '../common/button/iconButton';
import { useAuth } from '../../../configs/authContext/authContext';
import { register, login as loginApi } from '../../../utils/auth/api';
import { useNavigation } from '@react-navigation/native';
import { CheckCircle, Eye, EyeClosed, User2 } from 'lucide-react-native';

export default function AuthForm() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation()

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    terms_accepted: true,
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Changes
  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  // Toggle Form
  const toggleForm = () => {
    setIsLogin(prev => !prev);
    setForm({
      full_name: '',
      email: '',
      password: '',
      terms_accepted: true,
    });
    setShowPassword(false);
  };

  // Submit
  const handleSubmit = async () => {
    const { email, password, full_name } = form;

    if (!email || !password || (!isLogin && !full_name)) {
      ToastAndroid.show("Please fill in all fields", 3000);
      return;
    }

    setLoading(true);

    try {
      let response;

      if (isLogin) {
        response = await loginApi(email, password);
      } else {
        response = await register(full_name, email, password, true);
      }

      const user = response?.data;
      const token = response?.data?.token;

      await login(user, token);

    } catch (error) {
      ToastAndroid.show(error.message || "Something went wrong", 3000);
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
          value={form.full_name}
          onChangeText={(val) => handleInputChange('full_name', val)}
        />
      )}

      <InputField
        label="Email"
        placeholder="Enter email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(val) => handleInputChange('email', val)}
        leftIconName="email-outline"
        rightElement={form.email ? (form.email.includes('@') && form.email.includes('.')) ? <CheckCircle size={18} color={colors.success} /> : <Text style={{ color: colors.error, fontSize: 12 }}>Invalid</Text> : null}
        showError
      />

      <InputField
        label="Password"
        placeholder="Enter password"
        secureTextEntry={!showPassword}
        value={form.password}
        onChangeText={(val) => handleInputChange('password', val)}
        leftIconName="lock-outline"
        rightIconName={showPassword ? "eye-off-outline" : "eye-outline"}
        showError={false}
        rightElement={showPassword ? <Eye size={18} onPress={() => setShowPassword(!showPassword)} /> : <EyeClosed size={18} onPress={() => setShowPassword(!showPassword)} />}
      />

      {isLogin && (
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPassword}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      )}

      <Button
        label={isLogin ? "Log in" : "Sign up"}
        size="large"
        onPress={handleSubmit}
        loading={loading}
      />

      <Button
        style={styles.button}
        label={
          isLogin
            ? "Don't have an Account? Sign up"
            : "Already have an account? Login"
        }
        variant="outline"
        onPress={toggleForm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
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