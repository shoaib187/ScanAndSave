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
        <Text style={styles.storeName}>{name}</Text>
        <Text style={styles.storeDetail}>{detail}</Text>
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
    borderColor: colors.highlight,
    borderWidth: 1.5,
  },

  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoContainer: {
    width: Responsive.width(40),
    height: Responsive.width(40),
    borderRadius: Radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.small,
  },

  storeName: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },

  storeDetail: {
    fontSize: FontSize.tiny,
    color: colors.textSecondary,
  },

  storePrice: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
});