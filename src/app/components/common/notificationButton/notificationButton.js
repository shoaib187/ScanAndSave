import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../../../constants/colors';
import { FontSize, Radius, Spacing } from '../../../../constants/styles';

export default function NotificationButton({ checked, setChecked, title, subtitle, icon, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <View style={styles.menuLeft}>
        {icon && icon}
        <View style={styles.menuTexts}>
          <Text style={styles.menuTitle}>{title}</Text>
          <Text style={styles.menuSub}>{subtitle}</Text>
        </View>
      </View>
      <Switch
        value={checked}
        onValueChange={setChecked}
        trackColor={{ false: "#767577", true: "#8B86EF" }}
      />
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
    color: colors.textPrimary,
  },

  menuSub: {
    fontSize: FontSize.small,
    color: colors.textSecondary,
  },
});