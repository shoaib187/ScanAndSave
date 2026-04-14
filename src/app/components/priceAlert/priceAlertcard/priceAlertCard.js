import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Radius, Spacing, FontSize, Responsive } from '../../../../constants/styles';

export const PriceAlertCard = ({ title, currentPrice, targetInitial, daysAgo }) => {
  const [targetPrice, setTargetPrice] = useState(targetInitial);

  const diff = currentPrice - targetPrice;

  const diffText =
    diff > 0
      ? `Price is $${diff} above your target`
      : 'Price is at or below your target!';

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subtitleText}>
          Current: ${currentPrice} · Amazon · Set {daysAgo} days ago
        </Text>
      </View>

      {/* Control */}
      <View style={styles.controlContainer}>
        <View style={styles.labelRow}>
          <Text style={styles.labelText}>Alert me when price drops to</Text>
          <Text style={styles.priceValue}>${targetPrice}</Text>
        </View>

        <View style={styles.sliderWrapper}>
          <Slider
            style={styles.slider}
            minimumValue={100}
            maximumValue={500}
            step={1}
            value={targetPrice}
            onValueChange={(val) => setTargetPrice(Math.floor(val))}
            minimumTrackTintColor="#1A9B65"
            maximumTrackTintColor="#E2E2E2"
            thumbTintColor="#1A9B65"
          />
        </View>

        <Text style={styles.diffText}>{diffText}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.deleteButton]}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.saveButton]}>
            <Text style={styles.saveButtonText}>Save Alerts</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: Radius.xLarge,
    marginBottom: Spacing.large,

    shadowColor: '#999',
    shadowOffset: { width: 0, height: Responsive.height(2) },
    shadowOpacity: 0.05,
    shadowRadius: Responsive.width(10),
    elevation: 4,
  },

  header: {
    marginBottom: Spacing.medium,
    padding: Spacing.medium
  },

  titleText: {
    fontSize: FontSize.xLarge,
    fontWeight: '700',
    color: '#000',
    letterSpacing: -0.5,
  },

  subtitleText: {
    fontSize: FontSize.small,
    color: '#666',
    marginTop: Spacing.tiny,
  },

  controlContainer: {
    backgroundColor: '#F2F3E9',
    borderRadius: Radius.large,
    padding: Spacing.medium,
  },

  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  labelText: {
    fontSize: FontSize.small,
    color: '#707560',
  },

  priceValue: {
    fontSize: FontSize.medium,
    fontWeight: '700',
    color: '#1A9B65',
  },

  slider: {
    width: '100%',
    height: Responsive.height(30),
  },

  diffText: {
    fontSize: FontSize.tiny,
    color: '#707560',
    marginBottom: Spacing.medium,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    flex: 0.48,
    height: Responsive.height(48),
    borderRadius: Radius.xLarge,
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#C5C5C5',
  },

  saveButton: {
    backgroundColor: '#FFF',
  },

  deleteButtonText: {
    fontSize: FontSize.medium,
    fontWeight: '600',
    color: '#7C7C7C',
  },

  saveButtonText: {
    fontSize: FontSize.medium,
    fontWeight: '600',
    color: '#000',
  },
  sliderWrapper: {
    height: Responsive.height(30),
    justifyContent: 'center',
  },

});