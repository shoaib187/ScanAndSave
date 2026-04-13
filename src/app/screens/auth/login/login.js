import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthForm from '../../../components/authForm/authForm';
import { colors } from '../../../../constants/colors';
import { FontSize, Responsive, Spacing } from '../../../../constants/styles';

export default function Login() {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.logoWrapper}>
            <Image
              source={require("../../../../../assets/png/scan.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.subtitle}>Find the best price in seconds</Text>
          </View>
          <AuthForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background || '#EFEFE6',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.large,
  },
  logo: {
    // Responsive width/height works well, but keep it constrained
    width: Responsive.width(100),
    height: Responsive.width(100),
  },
  subtitle: {
    fontSize: FontSize.medium,
    fontWeight: "bold",
    marginTop: Spacing.small,
    color: '#333',
  }
});