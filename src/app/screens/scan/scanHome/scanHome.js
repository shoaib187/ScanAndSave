import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Alert,
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
import { FontSize, Responsive, Spacing } from '../../../../constants/styles';
import Header from '../../../components/common/header/header';
import { UserCircle2 } from 'lucide-react-native';
import { colors } from '../../../../constants/colors';
import ManualInputModal from '../../../components/common/manualInput/manualInput';
import ScannerOverlay from '../../../components/scanHome/scannerOverlay/scannerOverlay'

export default function ScanHome({ navigation }) {
  const [scanResults, setScanResults] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [flash, setFlash] = useState('off');
  const [hasPermission, setHasPermission] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [cameraPosition, setCameraPosition] = useState('back'); // Track camera position
  const device = useCameraDevice(cameraPosition); // Use cameraPosition state
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
    navigation.navigate('ScanResults', { scannedData: data, success });
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
    // Toggle between front and back camera
    const newPosition = cameraPosition === 'back' ? 'front' : 'back';
    setCameraPosition(newPosition);
    // Reset zoom when switching cameras
    setZoom(0);
  };

  const handleZoom = () => {
    // Increment zoom by 0.25, max 1, min 0
    let newZoom = zoom + 0.25;
    if (newZoom > 1) {
      newZoom = 0; // Reset to 0 when exceeding max zoom
    }
    setZoom(newZoom);
  };

  const handleManualEntry = () => {
    setIsVisible(true);
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
        wrapperStyle={{ backgroundColor: colors.background, zIndex: 9999 }}
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
          onZoom={zoomValue => setZoom(zoomValue)} // Handle pinch zoom gesture
        />

        {/* Overlay */}
        <ScannerOverlay
          scanLineAnim={scanLineAnim}
          flash={flash}
          handleZoom={handleZoom}
          toggleCamera={toggleCamera}
          toggleFlash={toggleFlash}
          zoom={zoom}
          cameraPosition={cameraPosition} // Pass camera position to overlay
        />
      </View>
      <TouchableOpacity activeOpacity={1} style={styles.manualEntryButton} onPress={handleManualEntry}>
        <Text style={styles.manualEntryText}>Can't Scan? Enter code manually →</Text>
      </TouchableOpacity>
      <ManualInputModal isVisible={isVisible} onClose={() => setIsVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
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

  manualEntryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.large,
    backgroundColor: colors.background,
  },

  manualEntryText: {
    color: '#22C55E',
    fontSize: FontSize.medium,
    fontWeight: '600',
    marginLeft: Spacing.small,
  },
});