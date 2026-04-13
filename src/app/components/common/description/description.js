import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../../configs/themeContext/themeContext';
import { FONT } from '../../constants/fonts';
import { FontSize, Radius, Spacing } from '../../constants/styles';



export default function DescriptionInput({
  value,
  onChangeText,
  placeholder = "Enter project description...",
  maxLength = 500,
  label = "Description"
}) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  // Character count logic
  const charCount = value?.length || 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.label, { color: theme.headingColor }]}>
          {label}
        </Text>
        <Text style={[styles.counter, { color: charCount >= maxLength ? theme.error : theme.paraColor }]}>
          {charCount}/{maxLength}
        </Text>
      </View>

      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: theme.whiteColor,
            borderColor: isFocused ? theme.blueColor : theme.lightCard,
            shadowColor: isFocused ? theme.blueColor : 'transparent'
          }
        ]}
      >
        <TextInput
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          placeholder={placeholder}
          placeholderTextColor={theme.slateColor}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            styles.input,
            { color: theme.headingColor, fontFamily: FONT.SpaceGroteskRegular }
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: Spacing.medium,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.tiny,
    paddingHorizontal: 4,
  },
  label: {
    fontSize: FontSize.small,
    fontFamily: FONT.SpaceGroteskBold,
  },
  counter: {
    fontSize: FontSize.small,
    fontFamily: FONT.SpaceGroteskRegular,
  },
  inputWrapper: {
    minHeight: 120,
    borderRadius: Radius.medium,
    borderWidth: 1,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small,
    // Smooth shadow for focus
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    fontSize: FontSize.small,
    paddingTop: 0, // Align text to top for Android
    lineHeight: 20,
  },
});