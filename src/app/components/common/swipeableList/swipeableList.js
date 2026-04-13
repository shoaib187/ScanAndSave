import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Custom Utilities
import { useTheme } from '../../configs/themeContext/themeContext';
import { Responsive } from '../../constants/styles';
import { FONT } from '../../constants/fonts';

export default function SwipeableActionView({
  item,
  onEdit,
  onDelete,
  children,
  swipeEnabled = true
}) {
  const { theme } = useTheme();

  // progress and dragX are provided by Swipeable automatically
  const renderRightActions = (progress, dragX) => {

    // This creates the "slide-in" effect for the buttons
    const trans = dragX.interpolate({
      inputRange: [-160, 0],
      outputRange: [0, 160], // Moves from 0 to 160 as you swipe
    });

    return (
      <View style={styles.actionContainer}>
        <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
          <View style={styles.innerActionContainer}>
            {onEdit && (
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: theme.blueColor }]}
                onPress={() => onEdit(item)}
              >
                <Icon name="pencil" size={Responsive.width(20)} color="#FFF" />
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
            )}

            {onDelete && (
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: theme.error }]}
                onPress={() => onDelete(item)}
              >
                <Icon name="delete" size={Responsive.width(20)} color="#FFF" />
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      friction={2}
      rightThreshold={40}
      enabled={swipeEnabled}
      overshootRight={false}
    >
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    width: 160,
    flexDirection: 'row',
  },
  innerActionContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: '#FFF',
    fontSize: 10,
    fontFamily: FONT.SpaceGroteskBold,
    marginTop: 4,
  },
});