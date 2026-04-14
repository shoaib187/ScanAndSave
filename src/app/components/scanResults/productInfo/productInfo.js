import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Bookmark, Heart, Share2 } from 'lucide-react-native';
import { colors } from '../../../../constants/colors';
import { FontSize, Responsive, Spacing } from '../../../../constants/styles';

export default function ProductInfo() {
  return (
    <View style={styles.headerRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.productTitle}>
          Sony WH-1000XM5 Wireless Headphones
        </Text>
        <Text style={styles.categoryText}>
          Electronic - Audio
        </Text>
      </View>

      <View style={styles.actionIcons}>
        <Heart size={Responsive.width(22)} color={colors.primary || '#E91E63'} />
        <Bookmark size={Responsive.width(22)} color={colors.textPrimary} />
        <Share2 size={Responsive.width(22)} color={colors.textPrimary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.medium,
  },

  productTitle: {
    fontSize: FontSize.large,
    fontWeight: '700',
    color: colors.textPrimary,
    width: '85%',
  },

  categoryText: {
    fontSize: FontSize.small,
    color: colors.textSecondary,
    marginTop: Spacing.tiny,
  },

  actionIcons: {
    flexDirection: 'row',
    gap: Spacing.small,
  },
});