import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Radius, Spacing } from '../../../../constants/styles';
import { colors } from '../../../../constants/colors';
import InputField from '../../../components/common/inputField/inputField';
import Button from '../../../components/common/button/iconButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { forgotPassword } from '../../../../utils/auth/api';


export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetRequest = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPassword(email);
      if (res?.success) {
        Alert.alert(
          "Check your email",
          "If an account exists for this email, you will receive reset instructions shortly.",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      }
    } catch (error) {
      Alert.alert("Request Failed", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter the email address associated with your account and we'll send you a link to reset your password.
        </Text>
      </View>

      <View style={styles.formWrapper}>
        <InputField
          label="Email Address"
          placeholder="e.g. shoaib@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.spacing} />

        <Button
          label="Send Reset Link"
          size="large"
          onPress={handleResetRequest}
          loading={loading}
        />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background || '#F5F5F5', // Falls back if background isn't defined
  },
  header: {
    paddingHorizontal: Spacing.large,
    paddingTop: Spacing.large * 2,
    marginBottom: Spacing.xLarge,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text || '#000',
    marginBottom: Spacing.small,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray || '#666',
    lineHeight: 22,
  },
  formWrapper: {
    borderRadius: Radius.large * 3,
    backgroundColor: colors.white,
    marginHorizontal: Spacing.small,
    padding: Spacing.large,
  },
  spacing: {
    height: Spacing.medium,
  },
  backButton: {
    marginTop: Spacing.large,
    alignItems: 'center',
  },
  backText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 15,
  },
});