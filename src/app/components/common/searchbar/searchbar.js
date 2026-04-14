import React, { memo } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../../constants/colors';
import { FontSize, Radius, Responsive, Spacing } from '../../../../constants/styles';
import { Search, X } from 'lucide-react-native';

// Custom Utilities

const Searchbar = memo(({
  placeholder = "Search...",
  value,
  onChangeText,
  style,
  renderElement,
  ...props
}) => {

  return (
    <View style={[styles.container, style]}>
      {/* Bordered Search Input Area */}
      <View style={[
        styles.searchWrapper,
        { borderColor: colors.border },
      ]}>
        <Search />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}

          style={[styles.searchInput]}
          {...props}
        />

        {value?.length > 0 && (
          <TouchableOpacity
            onPress={() => onChangeText('')}
            activeOpacity={0.7}
            style={styles.clearIcon}
          >
            <X />
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
    borderRadius: Radius.full,
    borderWidth: 1,
    backgroundColor: colors.white
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.small,
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