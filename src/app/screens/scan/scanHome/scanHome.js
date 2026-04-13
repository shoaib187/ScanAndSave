import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Alert,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import { Easing } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontSize, Radius, Responsive, Spacing } from '../../../../constants/styles';
import Header from '../../../components/common/header/header';
import { UserCircle2, Flashlight, Camera as CameraIcon, Maximize, Edit2 } from 'lucide-react-native';
import { colors } from '../../../../constants/colors';

const { width, height } = Dimensions.get('window');

export default function ScanHome({ navigation }) {
  const [scanResults, setScanResults] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [flash, setFlash] = useState('off');
  const [hasPermission, setHasPermission] = useState(false);
  const [zoom, setZoom] = useState(0);
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  // Scan line animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  // Request camera permission
  useEffect(() => {
    const requestPermission = async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Camera access is needed to scan QR codes',
        );
      }
    };
    requestPermission();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes.length > 0 && codes[0].value !== scannedData && isActive) {
        setScannedData(codes[0].value);
        setIsActive(false);
        console.log('QrCode Scannned: ', codes[0].value);
        // Simulate API call to verify employee
        setTimeout(() => {
          const success = Math.random() > 0.3; // 70% success rate for demo
          handleScanResult(success, codes[0].value);
        }, 1000);
      }
    },
  });

  const handleScanResult = (success, data) => {
    setScanResults(data);
    setTimeout(
      () => {
        setScannedData(null);
        setIsActive(true);
      },
      success ? 3000 : 4000,
    );
  };

  const toggleFlash = () => {
    setFlash(flash === 'off' ? 'on' : 'off');
  };

  const toggleCamera = () => {
    // This would require implementing camera device switching
    Alert.alert('Info', 'Camera switching feature coming soon');
  };

  const handleZoom = () => {
    // Cycle through zoom levels (0, 0.5, 1)
    const newZoom = zoom >= 1 ? 0 : zoom + 0.5;
    setZoom(newZoom);
  };

  const handleManualEntry = () => {
    Alert.alert('Manual Entry', 'Enter barcode manually', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Submit', onPress: () => console.log('Manual entry submitted') },
    ]);
  };

  const closeScanner = () => {
    Alert.alert('Close Scanner', 'Would you like to close the scanner?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', onPress: () => navigation.goBack() },
    ]);
  };

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Camera permission not granted. Please enable in settings.
        </Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading camera...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        showBack
        title={"Scan Barcode"}
        rightIcon={<UserCircle2 size={Responsive.width(24)} color="#333" strokeWidth={1.2} />}
        wrapperStyle={{ backgroundColor: colors.background }}
      />
      <View style={styles.container}>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive}
          codeScanner={codeScanner}
          torch={flash}
          enableZoomGesture={true}
          zoom={zoom}
        />

        {/* Overlay */}
        <View style={styles.overlay}>
          <View style={styles.scannerContainer}>
            <View style={styles.scannerFrame}>
              {/* Corners */}
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />

              {/* Animated Scan Line */}
              <Animated.View
                style={[
                  styles.scanLine,
                  {
                    transform: [
                      {
                        translateY: scanLineAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, width * 0.75 - 4],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
          </View>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <TouchableOpacity style={styles.controlButton} onPress={toggleFlash}>
              <Flashlight
                size={28}
                color={flash === 'on' ? '#22C55E' : '#fff'}
                strokeWidth={1.5}
              />
              <Text style={[styles.controlText, flash === 'on' && styles.activeControlText]}>
                Flash
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton} onPress={toggleCamera}>
              <CameraIcon size={28} color="#fff" strokeWidth={1.5} />
              <Text style={styles.controlText}>Flip</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.controlButton} onPress={handleZoom}>
              <Maximize size={28} color="#fff" strokeWidth={1.5} />
              <Text style={styles.controlText}>
                Zoom {zoom > 0 ? `${Math.round(zoom * 100)}%` : ''}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Manual Entry Button */}
        </View>
      </View>
      <TouchableOpacity style={styles.manualEntryButton} onPress={handleManualEntry}>
        <Text style={styles.manualEntryText}>Enter code manually</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: Spacing.large,
  },
  permissionText: {
    color: '#fff',
    fontSize: FontSize.medium,
    textAlign: 'center',
    marginTop: Spacing.medium,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    marginTop: Spacing.small,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: Responsive.height(20),
  },
  scannerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  scannerFrame: {
    width: width * 0.75,
    height: width * 0.75,
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
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
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: Spacing.large,
    paddingBottom: Spacing.medium,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: Spacing.medium,
    marginHorizontal: Spacing.medium,
    borderRadius: Radius.xLarge,
    marginBottom: Spacing.medium,
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.small,
  },
  controlText: {
    color: '#fff',
    fontSize: FontSize.small,
    marginTop: Spacing.tiny,
  },
  activeControlText: {
    color: '#22C55E',
  },
  manualEntryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.medium,
    marginHorizontal: Spacing.large,
    marginBottom: Platform.OS === 'ios' ? Spacing.large : Spacing.medium,
  },
  manualEntryText: {
    color: '#22C55E',
    fontSize: FontSize.medium,
    fontWeight: '600',
    marginLeft: Spacing.small,
  },
});