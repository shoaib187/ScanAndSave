import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import { Radius, Responsive, FontSize, Spacing } from '../../../../constants/styles';

export default function RetailerCard({ item, isSelected, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Left Section */}
      <View style={styles.leftSection}>
        <View style={styles.logoContainer}>
          <Image source={item.icon} style={styles.logo} />
        </View>

        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.retailerName}>{item?.name}</Text>
          <Text numberOfLines={1} style={styles.retailerDesc}>{item?.tagline}</Text>
        </View>
      </View>

      {/* Right Icon */}
      {isSelected ? (
        <CheckCircle2 size={24} color="#10B981" />
      ) : (
        <View style={styles.unselectedCircle} />
      )}
    </TouchableOpacity>
  );
}



export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: Radius.full,
    padding: Spacing.small,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.small,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  logoContainer: {
    width: Responsive.width(40),
    height: Responsive.width(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.small,
  },

  logoText: {
    fontSize: FontSize.large,
    fontWeight: 'bold',
    color: '#333',
  },

  textContainer: {
    flex: 1,
  },

  retailerName: {
    fontSize: FontSize.medium,
    fontWeight: '700',
    color: '#000',
  },

  retailerDesc: {
    fontSize: FontSize.small,
    color: '#666',
    marginTop: Responsive.height(2),
  },

  unselectedCircle: {
    width: Responsive.width(24),
    height: Responsive.width(24),
    borderRadius: Radius.circle,
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  logo: {
    width: Responsive.width(20),
    height: Responsive.width(20),
    resizeMode: 'contain'
  }
});