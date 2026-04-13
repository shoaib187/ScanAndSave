import React, { memo } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Custom Utilities
import { useTheme } from '../../configs/themeContext/themeContext';
import { FontSize, Radius, Responsive, Spacing } from '../../constants/styles';
import { FONT } from '../../constants/fonts';

const Searchbar = memo(({
  placeholder = "Search...",
  value,
  onChangeText,
  style,
  renderElement,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {/* Bordered Search Input Area */}
      <View style={[
        styles.searchWrapper,
        { backgroundColor: theme.whiteColor, borderColor: theme.lightCard },
      ]}>
        <Icon name="magnify" size={Responsive.width(20)} color={theme.paraColor} />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.paraColor}
          style={[styles.searchInput, { color: theme.headingColor }]}
          cursorColor={theme.blueColor}
          {...props}
        />

        {value?.length > 0 && (
          <TouchableOpacity
            onPress={() => onChangeText('')}
            activeOpacity={0.7}
            style={styles.clearIcon}
          >
            <Icon name="close-circle" size={Responsive.width(18)} color={theme.paraColor} />
          </TouchableOpacity>
        )}
      </View>

      {/* External Element (e.g., Filter Button) */}
      {renderElement && (
        <View style={styles.externalElement}>
          {renderElement()}
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.medium,
  },
  searchWrapper: {
    flex: 1, // Takes up remaining space
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.medium,
    height: Responsive.height(40),
    borderRadius: Radius.medium,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.small,
    fontFamily: FONT.SpaceGroteskRegular,
    fontSize: FontSize.medium,
    height: '100%',
    paddingVertical: 0,
  },
  clearIcon: {
    paddingLeft: Spacing.small,
  },
  externalElement: {
    marginLeft: Spacing.small,
  }
});

export default Searchbar;