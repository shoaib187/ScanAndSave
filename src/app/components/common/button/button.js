import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Button = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  leftIconSize = 20,
  rightIconSize = 20,
  leftIconColor,
  rightIconColor,
  icon,
  style,
  textStyle,
  buttonStyle,
  gradient = true,
  gradientColors = ['#000000', '#333333'],
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 0 },
  backgroundColor = '#000000',
  textColor = '#FFFFFF',
  iconColor = '#FFFFFF',
  loadingColor = '#FFFFFF',
  loadingText,
  showLoadingText = false,
}) => {
  const finalLeftIcon = leftIcon || icon;
  const finalLeftIconColor = leftIconColor || iconColor;
  const finalRightIconColor = rightIconColor || iconColor;

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={loadingColor} size="small" />
          {showLoadingText && loadingText && (
            <Text style={[styles.loadingText, { color: textColor }]}>
              {loadingText}
            </Text>
          )}
        </View>
      );
    }

    return (
      <>
        {finalLeftIcon && (
          <Ionicons
            name={finalLeftIcon}
            size={leftIconSize}
            color={finalLeftIconColor}
            style={styles.leftIcon}
          />
        )}
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {title}
        </Text>
        {rightIcon && (
          <Ionicons
            name={rightIcon}
            size={rightIconSize}
            color={finalRightIconColor}
            style={styles.rightIcon}
          />
        )}
      </>
    );
  };

  const buttonContent = (
    <View
      style={[
        styles.button,
        !gradient && { backgroundColor },
        buttonStyle,
        style,
        (disabled || loading) && styles.disabled,
      ]}
    >
      {renderContent()}
    </View>
  );

  if (gradient) {
    return (
      <TouchableOpacity
        disabled={loading || disabled}
        activeOpacity={0.7}
        onPress={handlePress}
      >
        <LinearGradient
          colors={gradientColors}
          start={gradientStart}
          end={gradientEnd}
          style={[
            styles.button,
            buttonStyle,
            style,
            (disabled || loading) && styles.disabled,
          ]}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      disabled={loading || disabled}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      {buttonContent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 20,
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default Button;