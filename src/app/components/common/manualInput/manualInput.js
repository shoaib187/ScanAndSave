import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { X } from 'lucide-react-native';
import { Radius, Spacing, FontSize, Responsive } from '../../../../constants/styles';
import Button from '../button/iconButton';
import { colors } from '../../../../constants/colors';

export default function ManualInputModal({ isVisible, onClose, onSubmit }) {
  const [barcode, setBarcode] = useState('');

  const handleHandleSubmit = () => {
    if (barcode.length > 5) {
      onSubmit(barcode);
      setBarcode('');
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.titleRow}>
              <Text style={styles.modalTitle}>Enter Product Code</Text>
              <Text>
                Type the serial number or barcode of the product.
              </Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#666" />
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: colors.background, padding: Spacing.medium, borderRadius: Radius.medium, borderTopLeftRadius: Radius.large, borderTopRightRadius: Radius.large }}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="e.g. 123456789012"
                keyboardType="number-pad"
                value={barcode}
                onChangeText={setBarcode}
                autoFocus={true}
                maxLength={14}
              />
            </View>
            <Button
              label="Search Product"
              onPress={handleHandleSubmit}
              disabled={barcode.length < 5}
              size='large'
              variant='secondary'
              style={{ marginTop: Spacing.medium, borderRadius: Radius.full }}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: Radius.large,
    marginHorizontal: Spacing.medium,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.large,
    padding: Spacing.medium,
  },
  titleRow: {
    width: '80%',
    marginRight: Spacing.medium,
  },
  modalTitle: {
    fontSize: FontSize.large, // Uses responsiveFont(18)
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: FontSize.medium, // Uses responsiveFont(14)
    color: '#666',
    marginBottom: Spacing.tiny, // Uses responsiveWidth(4)
    fontWeight: '500',
    paddingHorizontal: Spacing.medium,
  },
  inputWrapper: {
    backgroundColor: '#F5F5F0',
    borderRadius: Radius.medium,
    paddingHorizontal: Spacing.medium,
    height: Responsive.height(45),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0D0',
  },
  input: {
    fontSize: FontSize.large,
    color: '#333',
    fontWeight: '600',
    letterSpacing: 2,
    height: '100%',
  },
  helperText: {
    fontSize: FontSize.small, // Uses responsiveFont(12)
    color: '#999',
    marginTop: Spacing.small,
    textAlign: 'center',
    paddingHorizontal: Spacing.large,
  },
  // Added for the submit button container if needed
  buttonContainer: {
    marginTop: Spacing.large,
    paddingHorizontal: Spacing.medium,
  }
});