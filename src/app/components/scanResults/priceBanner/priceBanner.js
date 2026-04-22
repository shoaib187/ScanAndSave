import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import React from 'react';
import { colors } from '../../../../constants/colors';
import { FontSize, Radius, Spacing } from '../../../../constants/styles';

export default function PriceBanner({ bestPrice, url }) {
  const openUrl = () => {
    if (url) {
      Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
    }
  }
  return (
    <View style={styles.bestPriceBanner}>
      <View>
        <Text style={styles.bestPriceLabel}>Best Price Today</Text>

        <View style={styles.priceRow}>
          <Text style={styles.currency}>$</Text>
          <Text style={styles.priceAmount}>{bestPrice || "N/A"}</Text>
          {/* <Text style={styles.priceCents}>.00</Text> */}
        </View>

        {/* <Text style={styles.savingsText}>
          ↓ Save $70 vs retail
        </Text> */}
      </View>

      <TouchableOpacity onPress={openUrl} style={styles.buyNowButton}>
        <Text style={styles.buyNowText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bestPriceBanner: {
    backgroundColor: colors.background,
    borderRadius: Radius.medium,
    padding: Spacing.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Spacing.medium,
  },

  bestPriceLabel: {
    fontSize: FontSize.medium,
    color: colors.textPrimary,
    fontWeight: '500',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: Spacing.tiny,
  },

  currency: {
    fontSize: FontSize.large,
    fontWeight: 'bold',
    marginTop: Spacing.tiny,
    color: colors.textPrimary,
  },

  priceAmount: {
    fontSize: FontSize.xxLarge,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },

  priceCents: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
    marginTop: Spacing.tiny,
    color: colors.textPrimary,
  },

  savingsText: {
    fontSize: FontSize.small,
    color: "green",
    fontWeight: '600',
  },

  buyNowButton: {
    backgroundColor: colors.white,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.large,
    borderRadius: Radius.full,
  },

  buyNowText: {
    fontWeight: 'bold',
    fontSize: FontSize.medium,
    color: colors.textPrimary,
  },
});