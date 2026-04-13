import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from '../../configs/themeContext/themeContext';
import { FontSize, Radius, Responsive, Spacing } from '../../constants/styles';
import { FONT } from '../../constants/fonts';

const Dropdown = ({
  label = 'Select option',
  data = [],
  onSelect,
  style,
  disabled = false,
  placeholder = "Select an option"
}) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Stores the whole object

  const animation = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    const toValue = open ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      useNativeDriver: false,
      friction: 8,
    }).start();

    setOpen(!open);
  };

  // Limits height so it doesn't go off-screen, max out at 250 units
  const dropdownHeight = Math.min(data.length * Responsive.height(45), 250);

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, dropdownHeight],
  });

  return (
    <View style={[styles.container, style, { zIndex: open ? 1000 : 1, opacity: disabled ? 0.3 : 1 }]}>
      <Text style={[styles.label, { color: theme.headingColor }]}>{label}</Text>

      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.header,
          {
            backgroundColor: theme.lightCard,
            borderColor: open ? theme.headingColor : theme.borderColor || 'rgba(0,0,0,0.05)'
          }
        ]}
        activeOpacity={0.8}
        onPress={toggleDropdown}
      >
        <Text style={[
          styles.headerText,
          { color: selectedItem ? theme.headingColor : theme.paraColor }
        ]}>
          {/* Display the .name property if an item is selected */}
          {selectedItem ? selectedItem.name : placeholder}
        </Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={Responsive.width(16)}
          color={theme.headingColor}
        />
      </TouchableOpacity>

      <Animated.View style={[
        styles.dropdown,
        {
          height: heightInterpolate,
          backgroundColor: theme.whiteColor,
          shadowColor: "#000",
          borderColor: theme.borderColor,
          borderWidth: open ? 1 : 0,
          // Calculate top position dynamically based on label presence
          top: label ? 75 : 55,
        }
      ]}>
        <ScrollView scrollEnabled bounces={false} nestedScrollEnabled={true}>
          {data?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.item,
                { borderBottomColor: theme.borderColor + '50' },
                index === data.length - 1 && { borderBottomWidth: 0 }
              ]}
              onPress={() => {
                setSelectedItem(item);
                onSelect?.(item); // Returns the whole object {name, value}
                toggleDropdown();
              }}
            >
              <Text style={[styles.itemText, { color: theme.headingColor }]}>
                {item.name}
              </Text>
              {/* Check equality based on the unique .value property */}
              {selectedItem?.value === item.value && (
                <Ionicons name="checkmark" size={16} color={theme.headingColor} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: Spacing.medium,
  },
  label: {
    fontSize: FontSize.small,
    fontFamily: FONT.SpaceGroteskSemiBold,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
    borderRadius: Radius.medium,
    borderWidth: 1,
    height: Responsive.height(45),
  },
  headerText: {
    fontSize: FontSize.medium,
    fontFamily: FONT.SpaceGroteskRegular,
  },
  dropdown: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderRadius: Radius.medium,
    overflow: 'hidden',
    elevation: 5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  item: {
    padding: Spacing.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    height: Responsive.height(45),
  },
  itemText: {
    fontSize: FontSize.medium,
    fontFamily: FONT.SpaceGroteskMedium,
  },
});

export default Dropdown;