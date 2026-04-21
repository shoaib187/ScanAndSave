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
import { s } from 'react-native-size-matters';

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

      if (!isActive) {
        return;
      }

      if (codes.length === 0 || !codes[0].value) return;

      const scannedValue = codes[0].value;
      console.log('Valid scan detected:', scannedValue);

      setIsActive(false); // disable immediately to prevent double scans
      setIsScanning(true);

      scan(scannedValue, {
        onSuccess: (data) => {
          console.log('Scan API success:', data);
          navigation.navigate('ScanResults', { scannedData: scannedValue, product: data, success: true });
          setTimeout(() => {
            setIsActive(true);
            setIsScanning(false);
          }, 3000);
        },
        onError: () => {
          Alert.alert('Scan Failed', 'Could not find product. Try manual entry.');
          setIsActive(true);
          setIsScanning(false);
        },
      });
    },
  });


  const toggleFlash = () => {
    setFlash(flash === 'off' ? 'on' : 'off');
  };

  const toggleCamera = () => {
    const newPosition = cameraPosition === 'back' ? 'front' : 'back';
    setCameraPosition(newPosition);
    setZoom(0);
  };

  const handleZoom = () => {
    let newZoom = zoom + 0.25;
    if (newZoom > 1) {
      newZoom = 0;
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
          zoom={zoom}
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
