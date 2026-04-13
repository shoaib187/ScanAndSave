import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../configs/themeContext/themeContext';
import { FontSize, Radius, Spacing } from '../../constants/styles';
import { FONT } from '../../constants/fonts';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function DayPicker({ selectedDays, onDayPress, label }) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: theme.headingColor }]}>{label}</Text>}
      <View style={styles.daysWrapper}>
        {DAYS.map((day) => {
          const isSelected = selectedDays.includes(day);
          return (
            <TouchableOpacity
              key={day}
              onPress={() => onDayPress(day)}
              activeOpacity={0.7}
              style={[
                styles.dayButton,
                {
                  backgroundColor: isSelected ? theme.blueColor : theme.whiteColor,
                  borderColor: isSelected ? theme.blueColor : theme.lightCard
                }
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  { color: isSelected ? '#FFF' : theme.paraColor }
                ]}
              >
                {day.substring(0, 3)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: Spacing.medium },
  label: {
    fontSize: FontSize.small,
    fontFamily: FONT.SpaceGroteskBold,
    marginBottom: Spacing.tiny,
    marginLeft: 2,
  },
  daysWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Radius.small,
    borderWidth: 1,
    minWidth: 50,
    alignItems: 'center'
  },
  dayText: {
    fontFamily: FONT.SpaceGroteskMedium,
    fontSize: 12,
  }
});