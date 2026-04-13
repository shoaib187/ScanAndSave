import { Dimensions, Platform } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const responsiveWidth = (size) => scale(size);
const responsiveHeight = (size) => verticalScale(size);
const responsiveFont = (size) => moderateScale(size);

export const Spacing = {
  tiny: responsiveWidth(4),
  small: responsiveWidth(12),
  medium: responsiveWidth(14),
  large: responsiveWidth(24),
  xLarge: responsiveWidth(32),
};

export const Radius = {
  small: responsiveWidth(4),
  medium: responsiveWidth(8),
  large: responsiveWidth(12),
  xLarge: responsiveWidth(16),
  full: responsiveWidth(20),
  circle: 9999,
};

export const FontSize = {
  tiny: responsiveFont(10),
  small: responsiveFont(12),
  medium: responsiveFont(14),
  large: responsiveFont(18),
  xLarge: responsiveFont(24),
  xxLarge: responsiveFont(32),
};

export const Responsive = {
  width: responsiveWidth,
  height: responsiveHeight,
  font: responsiveFont,
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
};
