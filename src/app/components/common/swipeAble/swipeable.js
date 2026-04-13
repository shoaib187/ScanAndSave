import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../configs/themeContext/themeContext';
import { FontSize, Radius, Responsive, Spacing } from '../../constants/styles';
import { FONT } from '../../constants/fonts';

export default function SwipeableView({ item, onEdit, onDelete }) {
  const { theme } = useTheme();

  const renderRightActions = () => {
    return (
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.blueColor }]}
          onPress={() => onEdit(item)}
        >
          <Icon name="pencil" size={Responsive.width(20)} color="#FFF" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.error }]}
          onPress={() => onDelete(item)}
        >
          <Icon name="delete" size={Responsive.width(20)} color="#FFF" />
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      friction={2}
      rightThreshold={40}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.card, { backgroundColor: theme.whiteColor, borderBottomColor: theme.lightCard }]}
      >
        <View style={[styles.iconCircle, { backgroundColor: (item.category_color || theme.blueColor) + '15' }]}>
          <Icon
            name={item.category_icon || "folder-outline"}
            size={Responsive.width(24)}
            color={item.category_color || theme.blueColor}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text numberOfLines={1} style={[styles.catName, { color: theme.headingColor }]}>
            {item.category_name}
          </Text>
          <Text style={[styles.subText, { color: theme.paraColor }]}>
            {item.children?.length || 0} Subcategories
          </Text>
        </View>

        <Icon name="chevron-right" size={Responsive.width(20)} color={theme.slateColor + '50'} />
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.medium,
    borderBottomWidth: 1,
    height: Responsive.height(60),
  },
  iconCircle: {
    width: Responsive.width(45),
    height: Responsive.width(45),
    borderRadius: Radius.small,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: Spacing.medium,
  },
  catName: {
    fontSize: FontSize.medium,
    fontFamily: FONT.SpaceGroteskSemiBold,
  },
  subText: {
    fontSize: FontSize.small,
    fontFamily: FONT.SpaceGroteskRegular,
    marginTop: 2,
  },
  actionContainer: {
    flexDirection: 'row',
    width: 160,
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: '#FFF',
    fontSize: FontSize.small,
    fontFamily: FONT.NunitoBold,
    marginTop: 4,
  },
});