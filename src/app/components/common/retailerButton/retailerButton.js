import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { ChevronRight, ShoppingCart } from 'lucide-react-native';
import { Responsive, FontSize, Spacing, Radius } from '../../../../constants/styles';
import { colors } from '../../../../constants/colors';

export default function RetailerButton({ onPress, default_retailer }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <View style={styles.menuLeft}>
        <ShoppingCart size={Responsive.width(20)} color={colors.textPrimary} />

        <View style={styles.menuTexts}>
          <Text style={styles.menuTitle}>Default Retailer</Text>
          <Text style={styles.menuSub}>{default_retailer}</Text>
        </View>
      </View>

      <ChevronRight
        size={Responsive.width(22)}
        color={colors.textPrimary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.medium,
    marginHorizontal: Spacing.medium,
    borderRadius: Radius.full,
    marginBottom: Spacing.small,
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.small,
  },

  menuTexts: {
    justifyContent: 'center',
  },

  menuTitle: {
    fontSize: FontSize.medium,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  menuSub: {
    fontSize: FontSize.small,
    color: colors.secondary,
    textTransform: 'capitalize'
  },
});