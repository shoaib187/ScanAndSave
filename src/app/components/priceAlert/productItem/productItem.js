import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from '../../../../constants/colors';
import { FontSize, Radius, Responsive, Spacing } from '../../../../constants/styles';

export default function ProductItem({ item, onCreateAlert, creatingId }) {
  const isCreating = creatingId === item._id;

  // Derive a short category label
  const categoryLabel = item.category
    ? item.category.split(',').pop().trim()
    : 'Product';

  return (
    <View style={productStyles.card}>
      <Image
        source={{ uri: item.image }}
        style={productStyles.image}
        resizeMode="contain"
      />
      <View style={productStyles.info}>
        <Text style={productStyles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={productStyles.brand}>{item.brand}</Text>
        <Text style={productStyles.category} numberOfLines={1}>
          {categoryLabel}
        </Text>
        {item.best_price ? (
          <Text style={productStyles.price}>
            ${item.best_price.toFixed(2)}
          </Text>
        ) : (
          <Text style={productStyles.noPrice}>No price available</Text>
        )}
      </View>
      <TouchableOpacity
        style={[
          productStyles.alertBtn,
          isCreating && productStyles.alertBtnDisabled,
        ]}
        onPress={() => onCreateAlert(item)}
        disabled={isCreating}
        activeOpacity={0.75}
      >
        {isCreating ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={productStyles.alertBtnText}>+ Alert</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}


const productStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card ?? '#fff',
    borderRadius: Radius.medium,
    marginBottom: Spacing.medium,
    padding: Spacing.small,
  },
  image: {
    width: Responsive.width(60),
    height: Responsive.width(60),
    borderRadius: Radius.small,
    backgroundColor: '#f5f5f5',
    marginRight: Spacing.small,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: FontSize.medium,
    fontWeight: '700',
    color: colors.text ?? '#111',
  },
  brand: {
    fontSize: FontSize.small,
    color: colors.secondary ?? '#888',
    fontWeight: '500',
  },
  category: {
    fontSize: FontSize.small,
    color: colors.primary ?? '#aaa',
    marginTop: 1,
  },
  price: {
    fontSize: FontSize.medium,
    fontWeight: '700',
    color: colors.primary ?? '#2563eb',
    marginTop: 4,
  },
  noPrice: {
    fontSize: FontSize.small,
    color: colors.secondary ?? '#aaa',
    marginTop: 4,
    fontStyle: 'italic',
  },
  alertBtn: {
    backgroundColor: colors.primary ?? '#2563eb',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    minWidth: 70,
    alignItems: 'center',
    marginLeft: 8,
  },
  alertBtnDisabled: {
    opacity: 0.6,
  },
  alertBtnText: {
    color: '#fff',
    fontSize: FontSize.small,
    fontWeight: '700',
  },
});