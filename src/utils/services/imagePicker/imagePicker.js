import { Alert, Linking, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  PERMISSIONS,
  RESULTS,
  requestMultiple,
  checkMultiple,
} from 'react-native-permissions';

const getGalleryPermissions = () => {
  if (Platform.OS === 'ios') {
    return [PERMISSIONS.IOS.PHOTO_LIBRARY];
  }

  if (Platform.Version >= 33) {
    return [
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
    ];
  }

  return [PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];
};

export const requestGalleryPermission = async () => {
  try {
    const permissions = getGalleryPermissions();

    // Check current status first
    const currentStatus = await checkMultiple(permissions);
    const allGranted = Object.values(currentStatus).every(
      (result) => result === RESULTS.GRANTED || result === RESULTS.LIMITED
    );
    if (allGranted) return 'granted';

    // Request if not granted
    const result = await requestMultiple(permissions);

    const isGranted = Object.values(result).every(
      (status) => status === RESULTS.GRANTED || status === RESULTS.LIMITED
    );
    if (isGranted) return 'granted';

    const isBlocked = Object.values(result).some(
      (status) => status === RESULTS.BLOCKED
    );
    if (isBlocked) return 'blocked';

    return 'denied';
  } catch (err) {
    console.warn('Permission error:', err);
    return 'denied';
  }
};



export const pickImage = async (options = {}, onSuccess, onError) => {
  const status = await requestGalleryPermission();

  console.log('Gallery Permission Status:', status);

  if (status === 'blocked') {
    Alert.alert(
      'Permission Required',
      'Gallery access is permanently denied. Please enable it in settings.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ]
    );
    return;
  }

  if (status === 'denied') {
    Alert.alert('Permission Denied', 'Allow photo access to upload an image.');
    return;
  }

  try {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.7,
      maxWidth: 800,
      maxHeight: 800,
      ...options,
    });

    if (result.didCancel) return;

    if (result.errorCode) {
      console.error('ImagePicker Error:', result.errorMessage);
      onError?.(result.errorMessage);
      return;
    }

    const image = result.assets?.[0];
    if (image) onSuccess?.(image);
  } catch (err) {
    console.error('Picker crash:', err);
    onError?.(err.message);
  }
};