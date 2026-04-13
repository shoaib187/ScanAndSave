import React, { useRef, useEffect } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../../constants/colors/color';

const IOSSwitch = ({ value, onValueChange, activeColor = COLORS.PRIMARY }) => {
  const translateX = useRef(new Animated.Value(value ? 20 : 0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? 20 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [value]);

  return (
    <TouchableWithoutFeedback onPress={onValueChange}>
      <View
        style={[
          styles.track,
          { backgroundColor: value ? activeColor : '#E5E5EA' },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            { transform: [{ translateX }] },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 44,
    height: 24,
    borderRadius: 20,
    padding: 2,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 2,
    left: 2,
    elevation: 2,
  },
});

export default IOSSwitch;
