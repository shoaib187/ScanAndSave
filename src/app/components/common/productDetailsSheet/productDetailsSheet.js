import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { colors } from '../../../../constants/colors';
import { FontSize, Radius, Responsive, Spacing } from '../../../../constants/styles';
import { ExternalLink, Tag, Barcode } from 'lucide-react-native';
import Button from '../button/iconButton';
import { useCreatePriceAlert } from '../../../../hooks/useAlerts/useAlerts';


export default function ProductDetailsSheet({ item, onClose }) {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '75%'], []);
  // const { mutate: createPriceAlert } = useCreatePriceAlert();

  const product = item?.product_id || {};

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={onClose}
      />
    ),
    [onClose]
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.indicator}
      backgroundStyle={styles.sheetBackground}
    >
      <BottomSheetView style={styles.container}>

        {/* Product Image + Name */}
        <View style={styles.header}>
          {product?.image ? (
            <Image source={{ uri: product.image }} style={styles.image} />
          ) : (
            <View style={styles.imageFallback}>
              <Tag size={32} color={colors.secondary} />
            </View>
          )}
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{product?.name || 'Unknown Product'}</Text>
            <Text style={styles.brand}>{product?.brand || ''}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Details */}
        <View style={styles.detailsRow}>
          <View style={styles.detailCard}>
            <Barcode size={16} color={colors.secondary} />
            <Text style={styles.detailLabel}>Barcode</Text>
            <Text style={styles.detailValue}>{product?.barcode || '—'}</Text>
          </View>
          <View style={styles.detailCard}>
            <Tag size={16} color={colors.secondary} />
            <Text style={styles.detailLabel}>Best Price</Text>
            <Text style={styles.detailValue}>
              {product?.best_price ? `$${product.best_price}` : 'N/A'}
            </Text>
          </View>
          <View style={styles.detailCard}>
            <ExternalLink size={16} color={colors.secondary} />
            <Text style={styles.detailLabel}>Method</Text>
            <Text style={styles.detailValue}>
              {item?.scan_method === 'manual' ? 'Manual' : 'Scanned'}
            </Text>
          </View>
        </View>

        {/* Category */}
        {product?.category && (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryLabel}>Category</Text>
            <Text style={styles.categoryValue} numberOfLines={2}>
              {product.category.split(',')[0]}
            </Text>
          </View>
        )}

        {/* Scanned At */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>Scanned At</Text>
          <Text style={styles.categoryValue}>
            {item?.createdAt
              ? new Date(item.createdAt).toLocaleString()
              : '—'}
          </Text>
        </View>

      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: colors.background,
    borderRadius: Radius.xLarge,
  },
  indicator: {
    backgroundColor: colors.textSecondary,
    width: 40,
  },
  container: {
    flex: 1,
    padding: Spacing.large,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.medium,
    marginBottom: Spacing.medium,
  },
  image: {
    width: Responsive.width(70),
    height: Responsive.width(70),
    borderRadius: Radius.medium,
    backgroundColor: colors.white,
  },
  imageFallback: {
    width: Responsive.width(70),
    height: Responsive.width(70),
    borderRadius: Radius.medium,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: FontSize.xLarge,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  brand: {
    fontSize: FontSize.small,
    color: colors.textSecondary,
    marginTop: Spacing.tiny,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: Spacing.medium,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.medium,
  },
  detailCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: Spacing.medium,
    borderRadius: Radius.medium,
    marginHorizontal: 4,
    gap: Spacing.tiny,
  },
  detailLabel: {
    fontSize: FontSize.xSmall,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: FontSize.small,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  categoryContainer: {
    backgroundColor: colors.white,
    padding: Spacing.medium,
    borderRadius: Radius.medium,
    marginBottom: Spacing.small,
  },
  categoryLabel: {
    fontSize: FontSize.xSmall,
    color: colors.textSecondary,
    marginBottom: Spacing.tiny,
  },
  categoryValue: {
    fontSize: FontSize.small,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: Spacing.medium,
    borderRadius: Radius.medium,
    alignItems: 'center',
    marginTop: Spacing.medium,
  },
  buttonText: {
    color: colors.white,
    fontSize: FontSize.medium,
    fontWeight: '600',
  },
});