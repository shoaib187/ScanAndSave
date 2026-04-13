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
import { X, Hash } from 'lucide-react-native';
import { Radius, Spacing } from '../../../../constants/styles';
import Button from '../button/iconButton';

export default function ManualInputModal({ isVisible, onClose, onSubmit }) {
  const [barcode, setBarcode] = useState('');

  const handleHandleSubmit = () => {
    if (barcode.length > 5) {
      onSubmit(barcode);
      setBarcode(''); // Reset
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.titleRow}>
              <Hash size={20} color="#333" />
              <Text style={styles.modalTitle}>Manual Entry</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Enter Barcode Number</Text>

          {/* Input Field */}
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

          <Text style={styles.helperText}>
            Type the digits found directly underneath the barcode stripes.
          </Text>

          {/* Action Button */}
          <Button
            label="Check Product"
            onPress={handleHandleSubmit}
            disabled={barcode.length < 5}
            style={{ marginTop: Spacing.medium }}
          />
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: Radius.large * 2,
    borderTopRightRadius: Radius.large * 2,
    padding: Spacing.large,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.large,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputWrapper: {
    backgroundColor: '#F5F5F0',
    borderRadius: Radius.medium,
    paddingHorizontal: Spacing.medium,
    height: 55,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0D0',
  },
  input: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    letterSpacing: 2,
  },
  helperText: {
    fontSize: 12,
    color: '#999',
    marginTop: Spacing.small,
    textAlign: 'center',
  },
});