import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../configs/themeContext/themeContext';
import { FontSize, Radius, Spacing, Responsive } from '../../constants/styles';
import { FONT } from '../../constants/fonts';



export default function MyDatePicker({
  date,
  onDateChange,
  label = "Deadline",
  placeholder = "Select Date"
}) {
  const { theme, themeName } = useTheme();
  const [open, setOpen] = useState(false);

  // Format date for the display label (e.g., "Mar 25, 2026")
  const formatDate = (date) => {
    if (!date) return placeholder;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.headingColor }]}>{label}</Text>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setOpen(true)}
        style={[
          styles.inputTrigger,
          { backgroundColor: theme.whiteColor, borderColor: theme.lightCard }
        ]}
      >
        <Icon name="calendar-range" size={Responsive.width(20)} />
        <Text style={[
          styles.dateText,
          { color: date ? theme.headingColor : theme.slateColor }
        ]}>
          {formatDate(date)}
        </Text>
        <Icon name="chevron-down" size={Responsive.width(18)} color={theme.slateColor} />
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={date || new Date()}
        mode="date"
        theme={themeName === 'dark' || themeName === 'midnight' ? 'dark' : 'light'}
        textColor={theme.headingColor}
        buttonColor={theme.blueColor}
        onConfirm={(selectedDate) => {
          setOpen(false);
          onDateChange(selectedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: Spacing.medium,
  },
  label: {
    fontSize: FontSize.small,
    fontFamily: FONT.SpaceGroteskBold,
    marginBottom: Spacing.tiny,
    paddingHorizontal: 4,
  },
  inputTrigger: {
    height: Responsive.height(40),
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.small,
  },
  dateText: {
    flex: 1,
    fontSize: FontSize.small,
    fontFamily: FONT.SpaceGroteskRegular,
    marginLeft: Spacing.small,
  },
});