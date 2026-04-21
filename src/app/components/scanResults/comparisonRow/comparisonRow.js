import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from '../../../../constants/colors';
import { FontSize, Radius, Responsive, Spacing } from '../../../../constants/styles';

export const ComparisonRow = ({ logo, name, detail, price, isFirst }) => (
  <TouchableOpacity
    style={[
      styles.comparisonRow,
      isFirst && styles.firstComparisonRow
    ]}
  >
    <View style={styles.rowLeft}>
      <View style={styles.logoContainer}>
        {logo}
      </View>
      <View>
        <Text numberOfLines={1} style={styles.storeName}>{name}</Text>
        <Text numberOfLines={1} style={styles.storeDetail}>{detail}</Text>
      </View>
    </View>
    <Text style={styles.storePrice}>{price}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.medium,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: Radius.full,
    marginBottom: Spacing.small,
  },

  firstComparisonRow: {
    borderColor: colors.border,
    borderWidth: 1.5,
  },

  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  logoContainer: {
    width: Responsive.width(30),
    height: Responsive.width(30),
    borderRadius: Radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.small,
  },

  storeName: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
    color: colors.primary,
  },

  storeDetail: {
    fontSize: FontSize.tiny,
    color: colors.secondary,
  },

  storePrice: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
    color: colors.primary,
  },
});