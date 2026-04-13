// components/common/checkbox/customCheckbox.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors/color';
import { FontSize } from '../../constants/responsive/responsive';

const CustomCheckbox = ({ label, checked, onToggle }) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={styles.container}
      activeOpacity={0.8}
    >
      <View style={[styles.box, checked && styles.checkedBox]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.3,
    borderColor: COLORS.BORDERCOLOR,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkedBox: {
    borderColor: COLORS.SECONDARY,
    backgroundColor: COLORS.SECONDARY + '10',
  },
  checkmark: {
    fontSize: 14,
    color: COLORS.secondaryColor,
    fontWeight: 'bold',
  },
  label: {
    marginLeft: 10,
    fontSize: FontSize.sm,
    color: COLORS.lightDark,
  },
});
