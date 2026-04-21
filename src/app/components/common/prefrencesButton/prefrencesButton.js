import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { ChevronRight } from 'lucide-react-native'
import { FontSize, Radius, Responsive, Spacing } from '../../../../constants/styles'
import { colors } from '../../../../constants/colors'

export default function PrefrencesButton({ onPress, default_retailer, currency = "Region & Currency", region = "United States - USD", icon, symbol = "$", currency_symbol, wrapperStyle }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.menuItem, wrapperStyle]}>
      <View style={styles.menuLeft}>
        {icon && icon}
        {symbol && <Text style={[styles.currencyText, { fontSize: FontSize.large }]}>{symbol}</Text>}
        <View style={styles.menuTexts}>
          <Text style={styles.menuTitle}>{currency}</Text>
          <Text style={styles.menuSub}>{region}</Text>
        </View>
      </View>
      <View style={styles.menuRight}>
        <Text style={styles.currencyText}>{currency_symbol}</Text>
        <ChevronRight size={Responsive.width(22)} color="#000" />
      </View>
    </TouchableOpacity>
  )
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
    color: colors.primary,
  },

  menuSub: {
    fontSize: FontSize.small,
    color: colors.secondary,
    textTransform: 'capitalize'
  },

  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.tiny,
  },

  currencyText: {
    color: "greeen",
    fontWeight: '700',
    fontSize: FontSize.small,
  },
});