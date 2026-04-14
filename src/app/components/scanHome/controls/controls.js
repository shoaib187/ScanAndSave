import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraIcon, Flashlight, ZoomIn } from 'lucide-react-native';
import { Responsive, Spacing, FontSize } from '../../../../constants/styles';

export default function Controls({
  toggleCamera,
  toggleFlash,
  flash,
  zoom,
  handleZoom,
  cameraPosition
}) {
  return (
    <View style={styles.bottomControls}>
      <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
        <Flashlight
          size={Responsive.width(26)}
          color={flash === 'on' ? '#22C55E' : '#fff'}
          strokeWidth={1.5}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.controlButton} onPress={toggleCamera}>
        <CameraIcon size={Responsive.width(26)} color="#fff" strokeWidth={1.5} />
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.controlButton} onPress={handleZoom}>
        <ZoomIn size={Responsive.width(26)} color="#fff" strokeWidth={1.5} />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: Spacing.medium,
  },

  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: Responsive.width(70),
  },

  controlText: {
    color: '#fff',
    fontSize: FontSize.small,
    marginTop: Spacing.tiny,
  },

  activeControlText: {
    color: '#22C55E',
    fontWeight: '600',
  },
});