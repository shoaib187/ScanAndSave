import React from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import Controls from '../controls/controls';
import { Radius, Responsive, Spacing } from '../../../../constants/styles';

const { width } = Dimensions.get('window');
const FRAME_SIZE = width * 0.75;

export default function ScannerOverlay({
  scanLineAnim,
  toggleCamera,
  toggleFlash,
  flash,
  zoom,
  handleZoom,
  cameraPosition
}) {
  const translateY =
    scanLineAnim?.interpolate?.({
      inputRange: [0, 1],
      outputRange: [0, FRAME_SIZE - 4],
    }) || 0;

  return (
    <View style={styles.overlay}>
      {/* Scanner Frame */}
      <View style={styles.scannerContainer}>
        <View style={styles.scannerFrame}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />

          <Animated.View
            style={[
              styles.scanLine,
              {
                transform: [{ translateY }],
              },
            ]}
          />
        </View>
      </View>

      {/* Controls */}
      <Controls
        toggleCamera={toggleCamera}
        toggleFlash={toggleFlash}
        flash={flash}
        zoom={zoom}
        handleZoom={handleZoom}
        cameraPosition={cameraPosition}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },

  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scannerFrame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    position: 'relative',
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderRadius: Radius.xLarge,
  },

  corner: {
    position: 'absolute',
    width: Responsive.width(40),
    height: Responsive.width(40),
  },

  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#22C55E',
    borderTopLeftRadius: Radius.xLarge,
  },

  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#22C55E',
    borderTopRightRadius: Radius.xLarge,
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#22C55E',
    borderBottomLeftRadius: Radius.xLarge,
  },

  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#22C55E',
    borderBottomRightRadius: Radius.xLarge,
  },

  scanLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#22C55E',
    position: 'absolute',
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
});