import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';


export const requestGalleryPermission = async () => {
  if (Platform.OS !== 'android') return true;

  try {
    let permissions = [];

    if (Platform.Version >= 33) {
      // For Android 13+, if you use mediaType: 'any', request both
      permissions = [
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ];
    } else {
      return
    }

    const granted = await PermissionsAndroid.requestMultiple(permissions);

    // Check if all requested permissions are granted
    const allGranted = Object.values(granted).every(
      (result) => result === PermissionsAndroid.RESULTS.GRANTED
    );

    if (allGranted) return true;

    // Check if any permission was denied permanently
    const isPermanentDenial = Object.values(granted).some(
      (result) => result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    );

    if (isPermanentDenial) {
      Alert.alert(
        'Permission Required',
        'Gallery access is permanently denied. Please enable it in settings to select media.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
      );
    }

    return false;
  } catch (err) {
    console.warn('Permission error:', err);
    return false;
  }
};


export const pickImage = async (options = {}, onSuccess, onError) => {
  const granted = await requestGalleryPermission();
  if (!granted) {
    Alert.alert('Permission Denied', 'Allow photo access to upload an image.');
    return;
  }

  const defaultOptions = {
    mediaType: 'photo',
    quality: 0.7,
    maxWidth: 800,
    maxHeight: 800,
    ...options,  // override any default with passed options
  };

  launchImageLibrary(defaultOptions, (response) => {
    if (response.didCancel) return;

    if (response.errorCode) {
      console.error('ImagePicker Error:', response.errorMessage);
      onError?.(response.errorMessage);
      return;
    }

    const image = response.assets[0];
    onSuccess?.(image);
  });
};