import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  ChevronLeft,
  ShoppingCart,
  Store,
  MapPin,
  Tag
} from 'lucide-react-native';
import { Radius, Spacing, FontSize, Responsive } from '../../../../constants/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../../constants/colors';
import { ComparisonRow } from '../../../components/scanResults/comparisonRow/comparisonRow';
import ProductInfo from '../../../components/scanResults/productInfo/productInfo';
import PriceBanner from '../../../components/scanResults/priceBanner/priceBanner';
import { useFavorites } from '../../../../hooks/useFavorites/useFavorites';
import { useProductPrices } from '../../../../hooks/useProducts/useProducts';

export default function ScanResults({ navigation, route }) {
  const { data: favorites } = useFavorites()

  const { product } = route?.params || {};
  const productId = product?.data?._id
  // console.log("Product id is:", productId);
  const { data: pricesData, isFetching: isPricesFetching } = useProductPrices(productId);

  const prices = pricesData?.data?.prices || [];
  const pricesStatus = pricesData?.prices_status;
  const isPricesReady = pricesStatus === 'ready';


  console.log("productPrices in scan results", prices);
  const productInfo = product?.data[0] || product?.data || {};
  const image = productInfo?.image || 'https://via.placeholder.com/300x300.png?text=No+Image';
  const name = productInfo?.name || 'Unknown Product';
  const category = productInfo?.category || 'Unknown Category';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>


        <View style={styles.imageSection}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft color="#000" size={Responsive.width(30)} />
          </TouchableOpacity>
          <Image
            source={{ uri: image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.contentCard}>
          <ProductInfo favorites={favorites} id={productInfo?._id} name={name} category={category} />
          <PriceBanner />


          <Text style={styles.sectionTitle}>Price Comparison</Text>

          {!isPricesReady ? (
            <View style={styles.pricesLoading}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.pricesLoadingText}>
                {pricesStatus === 'unavailable'
                  ? 'Fetching prices...'
                  : 'Loading price comparison...'}
              </Text>
            </View>
          ) : (
            <>
              {/* {prices.map((price, index) => (
                <ComparisonRow
                  key={price._id || index}
                  name={price.retailer}
                  detail={price.detail || ''}
                  price={price.price ? `$${price.price}` : '—'}
                  isFirst={index === 0}
                  logo={<ShoppingCart size={20} color={colors.textPrimary} />}
                />
              ))} */}
            </>
          )}


          <ComparisonRow
            name="Amazon"
            detail="Prime · Free shipping · 2-day"
            price="$279"
            isFirst
            logo={<ShoppingCart size={20} color={colors.textPrimary} />}
          />

          <ComparisonRow
            name="Walmart"
            detail="Free shipping 3-5 days"
            price="$289"
            logo={<Store size={20} color={colors.textPrimary} />}
          />

          <ComparisonRow
            name="Target"
            detail="In-store pickup available"
            price="$350"
            logo={<Tag size={20} color="red" />}
          />

          <ComparisonRow
            name="Local Stores"
            detail="Live local data - 3 stores nearby"
            price="—"
            logo={<MapPin size={20} color={colors.textPrimary} />}
          />

          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View all stores</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  imageSection: {
    height: Responsive.height(350),
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Spacing.large,
  },

  backButton: {
    position: 'absolute',
    top: Spacing.small,
    left: Spacing.medium,
    zIndex: 10,
    backgroundColor: colors.white,
    width: Responsive.width(40),
    height: Responsive.width(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.circle,
  },

  productImage: {
    width: '80%',
    height: '100%',
  },

  contentCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: Radius.xLarge,
    borderTopRightRadius: Radius.xLarge,
    padding: Spacing.large,
    marginTop: -Spacing.small,
  },

  sectionTitle: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
    marginVertical: Spacing.small,
    color: colors.textPrimary,
  },

  placeholderLogo: {
    fontSize: FontSize.large,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },

  dotLogo: {
    width: Responsive.width(24),
    height: Responsive.width(24),
    borderRadius: Radius.circle,
    backgroundColor: colors.highlight,
  },

  viewAllButton: {
    backgroundColor: colors.background,
    height: Responsive.height(45),
    borderRadius: Radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.small,
  },

  viewAllText: {
    fontWeight: 'bold',
    fontSize: FontSize.medium,
    color: colors.textPrimary,
  },
});