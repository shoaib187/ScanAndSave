import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { colors } from '../../../../constants/colors';
import { FontSize, Spacing } from '../../../../constants/styles';

export default function SectionHeader({ title, count }) {
  return (
    <View style={sectionStyles.container}>
      <Text style={sectionStyles.title}>{title}</Text>
      {count != null && (
        <View style={sectionStyles.badge}>
          <Text style={sectionStyles.badgeText}>{count}</Text>
        </View>
      )}
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    gap: 8,
  },
  title: {
    fontSize: FontSize.large,
    fontWeight: '800',
    color: colors.text ?? '#111',
    letterSpacing: -0.3,
  },
  badge: {
    backgroundColor: colors.primary ?? '#2563eb',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: FontSize.small,
    fontWeight: '700',
  },
});
