import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { colors } from '../../../../constants/colors';
import { FontSize, Radius, Responsive, Spacing } from '../../../../constants/styles';


const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  // Left Icon Props
  leftIconName,
  onLeftIconPress,
  leftIconClickable = false,
  // Right Icon Props
  rightIconName,
  onRightIconPress,
  rightIconClickable = true,
  rightElement, // Added support for custom components like "Change" text
  // Legacy support
  iconName,
  onIconPress,
  // Input Props
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  showError = true,
  multiline = false,
  editable = true,
  disabled = false,
  // Style Props
  wrapperStyle,
  inputStyle,
  containerStyle,
  // Custom Error
  customErrorMessage,
}) => {


  // Backward compatibility logic
  const finalRightIconName = rightIconName || iconName;
  const finalOnRightIconPress = onRightIconPress || onIconPress;

  // Validation Logic
  const isEmailField = keyboardType === 'email-address';
  const isPasswordField = label?.toLowerCase().includes('password') || secureTextEntry;

  const isInvalidEmail = isEmailField && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isInvalidPassword = isPasswordField && value && value.length > 0 && value.length < 8;

  const hasError = isInvalidEmail || isInvalidPassword || !!customErrorMessage;

  const handleTextChange = (text) => {
    if (keyboardType === 'phone-pad' || keyboardType === 'numeric') {
      const numericValue = text.replace(/[^0-9]/g, '');
      onChangeText(numericValue);
    } else {
      onChangeText(text);
    }
  };

  const getErrorMessage = () => {
    if (customErrorMessage) return customErrorMessage;
    if (isInvalidEmail) return 'Please enter a valid email address';
    if (isInvalidPassword) return 'Password must be at least 8 characters';
    return '';
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label]}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.wrapper,
          {

            borderColor: "#eee",
            opacity: disabled ? 0.6 : 1,
          },
          wrapperStyle,
        ]}
      >

        {/* Text Input */}
        <TextInput
          value={value}
          multiline={multiline}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor={"#9CA3AF"}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          style={[
            styles.input,
            inputStyle,
          ]}
          editable={editable && !disabled}
        />

        {/* Right Icon or Custom Element */}
        {rightElement ? (
          <View style={styles.rightElement}>{rightElement}</View>
        ) : finalRightIconName ? (
          <View />
        ) : null}
      </View>

      {/* Error Message */}
      {showError && hasError && (
        <Text style={[styles.errorText]}>
          {getErrorMessage()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.medium,
    width: '100%',
  },
  label: {
    fontSize: FontSize.small,
    marginBottom: Spacing.tiny,
    marginLeft: 2,
    fontWeight: "bold"
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: Radius.medium,
    minHeight: Responsive.height(45),
    paddingHorizontal: Spacing.medium,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: FontSize.medium,
    paddingVertical: Responsive.height(12),
    marginLeft: Spacing.tiny,
  },
  rightElement: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.tiny,
  },
  errorText: {
    fontSize: FontSize.tiny,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default InputField;