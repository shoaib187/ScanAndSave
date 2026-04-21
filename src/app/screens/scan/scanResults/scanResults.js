import React, { useState } from 'react';
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

// export default function ScanResults({ navigation, route }) {
//   const { data: favorites } = useFavorites()

//   const { product } = route?.params || {};
//   const productId = product?.data?._id
//   console.log("Product is:", product);
//   const { data: pricesData, isFetching: isPricesFetching } = useProductPrices(productId);

//   const prices = pricesData?.data?.prices || [];
//   const pricesStatus = pricesData?.prices_status;
//   const isPricesReady = pricesStatus === 'ready';


//   const productInfo = product?.data[0] || product?.data || {};
//   const image = productInfo?.image || 'https://via.placeholder.com/300x300.png?text=No+Image';
//   const name = productInfo?.name || 'Unknown Product';
//   const category = productInfo?.category || 'Unknown Category';

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>


//         <View style={styles.imageSection}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <ChevronLeft color="#000" size={Responsive.width(30)} />
//           </TouchableOpacity>
//           <Image
//             source={{ uri: image }}
//             style={styles.productImage}
//             resizeMode="contain"
//           />
//         </View>
//         <View style={styles.contentCard}>
//           <ProductInfo favorites={favorites} id={productInfo?._id} name={name} category={category} />
//           <PriceBanner />


//           <Text style={styles.sectionTitle}>Price Comparison</Text>

//           {!isPricesReady ? (
//             <View style={styles.pricesLoading}>
//               <ActivityIndicator size="small" color={colors.primary} />
//               <Text style={styles.pricesLoadingText}>
//                 {pricesStatus === 'unavailable'
//                   ? 'Fetching prices...'
//                   : 'Loading price comparison...'}
//               </Text>
//             </View>
//           ) : (
//             <>
//               {/* {prices.map((price, index) => (
//                 <ComparisonRow
//                   key={price._id || index}
//                   name={price.retailer}
//                   detail={price.detail || ''}
//                   price={price.price ? `$${price.price}` : '—'}
//                   isFirst={index === 0}
//                   logo={<ShoppingCart size={20} color={colors.textPrimary} />}
//                 />
//               ))} */}
//             </>
//           )}


//           <ComparisonRow
//             name="Amazon"
//             detail="Prime · Free shipping · 2-day"
//             price="$279"
//             isFirst
//             logo={<ShoppingCart size={20} color={colors.textPrimary} />}
//           />

//           <ComparisonRow
//             name="Walmart"
//             detail="Free shipping 3-5 days"
//             price="$289"
//             logo={<Store size={20} color={colors.textPrimary} />}
//           />

//           <ComparisonRow
//             name="Target"
//             detail="In-store pickup available"
//             price="$350"
//             logo={<Tag size={20} color="red" />}
//           />

//           <ComparisonRow
//             name="Local Stores"
//             detail="Live local data - 3 stores nearby"
//             price="—"
//             logo={<MapPin size={20} color={colors.textPrimary} />}
//           />

//           <TouchableOpacity style={styles.viewAllButton}>
//             <Text style={styles.viewAllText}>View all stores</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

export default function ScanResults({ navigation, route }) {
  const [showAll, setShowAll] = useState(false);
  const { data: favorites } = useFavorites();

  const { product } = route?.params || {};
  const productId = product?.data?._id;
  const { data: pricesData, isFetching: isPricesFetching } = useProductPrices(productId);


  const productInfo = product?.data[0] || product?.data || {};
  const image = productInfo?.image || 'https://via.placeholder.com/300x300.png?text=No+Image';
  const name = productInfo?.name || 'Unknown Product';
  const category = productInfo?.category || 'Unknown Category';

  // Use retailer_prices from the product data directly
  const allPrices = (productInfo?.retailer_prices || [])
    .filter(p => p.price != null)
    .sort((a, b) => a.price - b.price);

  const best_price = productInfo?.best_price;
  // const lowest_price = productInfo?.lowest_price;
  // const lowest_retailer = productInfo?.lowest_retailer;
  // const lowest_retailer_price = productInfo?.lowest_retailer_price;
  // const lowest_retailer_url = productInfo?.lowest_retailer_url;

  const visiblePrices = showAll ? allPrices : allPrices.slice(0, 5);

  const retailerIcons = {
    walmart: <Store size={20} color={colors.textPrimary} />,
    amazon: <ShoppingCart size={20} color={colors.textPrimary} />,
    default: <Tag size={20} color={colors.textPrimary} />,
  };

  const getIcon = (slug = '') => {
    const key = Object.keys(retailerIcons).find(k => slug.includes(k));
    return retailerIcons[key] || retailerIcons.default;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageSection}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft color="#000" size={Responsive.width(30)} />
          </TouchableOpacity>
          <Image source={{ uri: image }} style={styles.productImage} resizeMode="contain" />
        </View>

        <View style={styles.contentCard}>
          <ProductInfo favorites={favorites} id={productInfo?._id} name={name} category={category} />
          <PriceBanner bestPrice={best_price} bestRetailer={allPrices[0]?.retailer_name} />

          <Text style={styles.sectionTitle}>Price Comparison</Text>

          {isPricesFetching && !allPrices?.length ? (
            <View style={styles.pricesLoading}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.pricesLoadingText}>Loading price comparison...</Text>
            </View>
          ) : (
            <>
              {visiblePrices?.map((price, index) => (
                <ComparisonRow
                  key={`${price.retailer_slug}-${index}`}
                  name={price.retailer_name}
                  detail={[
                    price.availability === 'in_stock' ? 'In stock' : 'Out of stock',
                    price.shipping_info,
                    price.original_price ? `Was $${price.original_price.toFixed(2)}` : null,
                  ].filter(Boolean).join(' · ')}
                  price={`$${price.price.toFixed(2)}`}
                  isFirst={index === 0}
                  logo={getIcon(price.retailer_slug)}
                />
              ))}

              {allPrices?.length > 5 && (
                <TouchableOpacity
                  style={styles.viewAllButton}
                  onPress={() => setShowAll(prev => !prev)}
                >
                  <Text style={styles.viewAllText}>
                    {showAll
                      ? 'Show less'
                      : `View all ${allPrices.length} stores`}
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
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