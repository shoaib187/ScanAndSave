import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { FontSize, Radius, Responsive, Spacing } from '../../../../constants/styles';
import { colors } from '../../../../constants/colors';

export default function Header({
  title,
  leftIcon,
  onLeftPress,
  rightIcon,
  onRightPress,
  showBack = false,
  wrapperStyle
}) {
  return (
    <View style={[styles.headerContainer, wrapperStyle]}>

      {/* Left Slot */}
      <View style={styles.sideContainer}>
        {showBack ? (
          <TouchableOpacity onPress={onLeftPress} style={styles.iconPadding}>
            <ChevronLeft size={Responsive.width(28)} color="#333" />
          </TouchableOpacity>
        ) : (
          <View>

            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.subWelcomeText}>Ready to save today ?</Text>
          </View>
        )}
      </View>

      {/* Center Slot - Absolute positioning ensures it stays centered regardless of icons */}
      <View style={styles.centerWrapper} pointerEvents="none">
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {/* Right Slot */}
      <View style={[styles.sideContainer, { alignItems: 'flex-end' }]}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={styles.iconPadding}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: Spacing.medium,
    backgroundColor: 'transparent',
    width: '100%',
  },
  sideContainer: {
    flex: 1,
    zIndex: 10, // Icons stay clickable above the center wrapper
  },
  centerWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  iconPadding: {
    width: Responsive.width(40),
    height: Responsive.width(40),
    backgroundColor: colors.white,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcomeText: {
    fontSize: FontSize.large,
    fontWeight: 'bold',
    color: colors.primary,
  },
  subWelcomeText: {
    fontSize: FontSize.medium,
    color: colors.secondary,
    marginTop: 4,
  },
});