import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '../../configs/themeContext/themeContext';
import { FontSize, Spacing } from '../../constants/styles';
import { FONT } from '../../constants/fonts';

const Intro = ({ title, description }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.intro}>
      {title && (
        <Text style={[styles.title, { color: theme.headingColor }]}>
          {title}
        </Text>
      )}
      {description && (
        <Text style={[styles.description, { color: theme.paraColor }]}>
          {description}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  intro: {
    marginBottom: Spacing.large,
  },
  title: {
    fontSize: FontSize.large,
    fontFamily: FONT.SpaceGroteskBold,
  },
  description: {
    fontSize: FontSize.medium,
    fontFamily: FONT.SpaceGroteskRegular,
    marginTop: Spacing.tiny
  },
});

export default Intro;