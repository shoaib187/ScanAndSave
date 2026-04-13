import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FontSize, Radius } from '../../../../constants/styles';
import { colors } from '../../../../constants/colors';


const Button = ({
  icon,
  label,
  onPress,
  size = 'medium',
  variant = 'primary',
  style,
  loading = false
}) => {

  const sizeMap = {
    small: { padding: 4, icon: 16, font: FontSize.small, gap: 4 },
    medium: { padding: 8, icon: 20, font: FontSize.small, gap: 6 },
    large: { padding: 12, icon: 24, font: FontSize.medium, gap: 8 },
  };

  const config = sizeMap[size];

  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return {
          bg: 'transparent',
          border: 'transparent',
          text: colors.primary
        };
      case 'secondary':
        return {
          bg: colors.white,
          border: 'transparent',
          text: colors.primary
        };
      default: // Primary
        return {
          bg: colors.primary,
          border: 'transparent',
          text: colors.white
        };
    }
  };

  const { bg, border, text } = getVariantStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.button,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          backgroundColor: bg,
          borderColor: border,
          borderWidth: variant === 'outline' ? 1 : 0,
          paddingVertical: config.padding,
          paddingHorizontal: config.padding * 1.4,
        },
        style
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={text}
          size="small"
        />
      ) :
        label && (
          <Text style={[styles.text, { color: text, fontSize: config.font, marginLeft: config.gap }]}>
            {label}
          </Text>
        )
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.medium,
  },
  text: {
  },
});

export default Button;