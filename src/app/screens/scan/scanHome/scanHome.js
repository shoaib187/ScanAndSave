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
  useCameraFormat,
  useCodeScanner,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { Easing } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontSize, Responsive, Spacing } from '../../../../constants/styles';
import Header from '../../../components/common/header/header';
import { ClockFading, UserCircle2 } from 'lucide-react-native';
import { colors } from '../../../../constants/colors';
import ManualInputModal from '../../../components/common/manualInput/manualInput';
import ScannerOverlay from '../../../components/scanHome/scannerOverlay/scannerOverlay'
import { useManualSearch, useScanBarcode } from '../../../../hooks/useScanner/useScanner';

export default function ScanHome({ navigation }) {

  const { mutate: scan, isPending: isScanningP, data: scanResult } = useScanBarcode();
  const { mutate: search, isPending: isSearching, data: searchResult } = useManualSearch();

  // On barcode detected
  // scan(barcodeValue, {
  //   onSuccess: (data) => navigation.navigate('ProductDetail', { product: data }),
  // });

  // // On search submit
  // search(queryText, {
  //   onSuccess: (data) => navigation.navigate('ProductDetail', { product: data }),
  // });


  const [scanResults, setScanResults] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [flash, setFlash] = useState('off');
  const [isScanning, setIsScanning] = useState(false);

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
    codeTypes: ['qr', 'ean-13', 'ean-8', 'code-128'],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`);
      console.log('Raw Scanner Output:', codes.map(c => ({ value: c.value, type: c.type })));
      setIsScanning(true);

      if (codes.length > 0 && codes[0].value && isActive) {
        const scannedValue = codes[0].value;
        console.log('Valid scan detected:', scannedValue);

        setScannedData(scannedValue);
        setIsActive(false);

        // Don't use setTimeout for API call if you want immediate navigation
        handleScanResult(true, scannedValue); // Test with success=true first
        setTimeout(() => setIsScanning(false), 500);
      } else if (codes.length > 0 && !isActive) {
        console.log('Scanner inactive, ignoring scan');
      } else if (codes.length > 0 && !codes[0].value) {
        console.log('Scanned code has no value');
      }
    },
  });

  const handleScanResult = (success, data) => {
    console.log('Navigating to ScanResults with:', { scannedData: data, success });
    setScanResults(data);

    // Add navigation error handling
    try {
      navigation.navigate('ScanResults', { scannedData: data, success });
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'Could not navigate to results screen');
    }

    setTimeout(() => {
      setScannedData(null);
      setIsActive(true);
    }, success ? 3000 : 4000);
  };
  const toggleFlash = () => {
    setFlash(flash === 'off' ? 'on' : 'off');
  };

  const format = useCameraFormat(device, [
    { videoResolution: { width: 1280, height: 720 } }, // 720p is the "Sweet spot" for QR
    { fps: 30 }
  ]);



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
        // eslint-disable-next-line react-native/no-inline-styles
        wrapperStyle={{
          backgroundColor: colors.background,
          zIndex: 9999
        }}
        onRightPress={() => navigation.navigate("Profile")}
      />
      <View style={styles.container}>
        <Camera
          ref={camera}
          onInitialized={() => console.log("Camera initialized")}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive}
          codeScanner={codeScanner}
          torch={flash}
          format={format}
          zoom={zoom}
          pixelFormat="yuv"
          onZoom={zoomValue => setZoom(zoomValue)}
        />
        <ScannerOverlay
          scanLineAnim={scanLineAnim}
          flash={flash}
          handleZoom={handleZoom}
          toggleCamera={toggleCamera}
          toggleFlash={toggleFlash}
          zoom={zoom}
          cameraPosition={cameraPosition}
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
