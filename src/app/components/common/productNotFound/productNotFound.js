import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { ScanLine, SearchX } from 'lucide-react-native';
import { colors } from '../../../../constants/colors';
import { FontSize, Radius, Spacing } from '../../../../constants/styles';

export default function ProductNotFound({ visible, barcode, onClose, onManualEntry }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>

          {/* Icon */}
          <View style={styles.iconContainer}>
            <SearchX size={40} color={colors.primary} />
          </View>

          {/* Title */}
          <Text style={styles.title}>Product Not Found</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            We couldn't find a product matching the scanned barcode.
          </Text>

          {/* Barcode */}
          {barcode && (
            <View style={styles.barcodeContainer}>
              <ScanLine size={14} color={colors.textSecondary} />
              <Text style={styles.barcodeText}>{barcode}</Text>
            </View>
          )}

          {/* Actions */}
          <TouchableOpacity style={styles.primaryButton} onPress={onManualEntry}>
            <Text style={styles.primaryButtonText}>Search Manually</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={onClose}>
            <Text style={styles.secondaryButtonText}>Scan Again</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.large,
  },

  dialog: {
    backgroundColor: colors.background,
    borderRadius: Radius.xLarge,
    padding: Spacing.xLarge,
    width: '100%',
    alignItems: 'center',
  },

  iconContainer: {
    backgroundColor: '#FEE2E2',
    padding: Spacing.large,
    borderRadius: Radius.circle,
    marginBottom: Spacing.medium,
  },

  title: {
    fontSize: FontSize.xLarge,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: Spacing.small,
  },

  subtitle: {
    fontSize: FontSize.small,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.medium,
  },

  barcodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.tiny,
    backgroundColor: colors.white,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.medium,
    borderRadius: Radius.medium,
    marginBottom: Spacing.large,
  },

  barcodeText: {
    fontSize: FontSize.small,
    color: colors.textSecondary,
    fontFamily: 'monospace',
  },

  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: Spacing.medium,
    borderRadius: Radius.medium,
    width: '100%',
    alignItems: 'center',
    marginBottom: Spacing.small,
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: FontSize.medium,
    fontWeight: '600',
  },

  secondaryButton: {
    paddingVertical: Spacing.medium,
    borderRadius: Radius.medium,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  secondaryButtonText: {
    color: colors.textPrimary,
    fontSize: FontSize.medium,
    fontWeight: '600',
  },
});