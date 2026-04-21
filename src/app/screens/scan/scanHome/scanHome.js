import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
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
import { useScanBarcode } from '../../../../hooks/useScanner/useScanner';
import ProductNotFound from '../../../components/common/productNotFound/productNotFound';

export default function ScanHome({ navigation }) {

  const { mutate: scan } = useScanBarcode();


  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [flash, setFlash] = useState('off');


  const [notFoundVisible, setNotFoundVisible] = useState(false);
  const [lastBarcode, setLastBarcode] = useState(null);



  const [hasPermission, setHasPermission] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [cameraPosition, setCameraPosition] = useState('back');
  const device = useCameraDevice(cameraPosition);
  const camera = useRef(null);
  const scanLineAnim = useRef(new Animated.Value(0)).current;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      setIsActive(false);
      setLastBarcode(scannedValue);

      scan(scannedValue, {
        onSuccess: (data) => {

          navigation.navigate('ScanResults', { scannedData: scannedValue, product: data, success: true });
          setTimeout(() => {
            setIsActive(true);
          }, 3000);
        },
        onError: () => {
          setIsActive(true);
          setNotFoundVisible(true);
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
          toggleCamera={toggleCamera}
          toggleFlash={toggleFlash}
          zoom={zoom}
          cameraPosition={cameraPosition}
        />
      </View>
      <TouchableOpacity activeOpacity={1} style={styles.manualEntryButton} onPress={handleManualEntry}>
        <Text style={styles.manualEntryText}>Can't Scan? Enter code manually →</Text>
      </TouchableOpacity>

      <ManualInputModal
        onNotFound={(barcode) => {
          setLastBarcode(barcode);
          setNotFoundVisible(true);
        }}
        isVisible={isVisible} onClose={() => setIsVisible(false)} />

      <ProductNotFound
        visible={notFoundVisible}
        barcode={lastBarcode}
        onClose={() => {
          setNotFoundVisible(false);
          setIsActive(true);
        }}
        onManualEntry={() => {
          setNotFoundVisible(false);
          setIsVisible(true);
        }}
      />

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
