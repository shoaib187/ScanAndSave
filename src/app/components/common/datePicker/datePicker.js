import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DatePickerModal from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../configs/themeContext/themeContext';
import { FONT } from '../../constants/fonts';
import { FontSize, Radius, Responsive, Spacing } from '../../constants/styles';



const DatePicker = ({
  label,
  value,
  onChange,
  mode = 'date',
  placeholder = 'Select Date',
  minimumDate,
  maximumDate,
}) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  const formattedValue = () => {
    if (!value) return placeholder;

    if (mode === 'time') {
      return value.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }
    // Format: YYYY-MM-DD
    return value.toISOString().split('T')[0];
  };

  return (
    <View style={styles.inputWrapper}>
      {label && <Text style={[styles.label, { color: theme.headingColor }]}>{label}</Text>}

      <TouchableOpacity
        style={[
          styles.inputField,
          {
            backgroundColor: theme.lightCard,
            borderColor: theme.borderColor || 'rgba(0,0,0,0.05)'
          }
        ]}
        activeOpacity={0.7}
        onPress={() => setOpen(true)}
      >
        <Text
          style={[
            styles.inputText,
            { color: value ? theme.headingColor : theme.paraColor },
          ]}
        >
          {formattedValue()}
        </Text>
        <Ionicons
          name={mode === 'time' ? 'time-outline' : 'calendar-outline'}
          size={Responsive.width(16)}
          color={theme.headingColor}
        />
      </TouchableOpacity>

      <DatePickerModal
        modal
        open={open}
        date={value || new Date()}
        mode={mode}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        theme={theme.type === 'dark' ? 'dark' : 'light'}
        onConfirm={(date) => {
          setOpen(false);
          onChange?.(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: Spacing.medium,
    flex: 1
  },
  label: {
    fontSize: FontSize.small,
    fontFamily: FONT.SpaceGroteskSemiBold,
  },
  inputField: {
    height: Responsive.height(45),
    borderWidth: 1,
    borderRadius: Radius.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.medium,
  },
  inputText: {
    fontSize: FontSize.medium,
    fontFamily: FONT.SpaceGroteskRegular,
  },
});

export default DatePicker;