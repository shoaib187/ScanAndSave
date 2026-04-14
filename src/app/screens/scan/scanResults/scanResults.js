import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
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

export default function ScanResults({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>


        <View style={styles.imageSection}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft color="#000" size={Responsive.width(30)} />
          </TouchableOpacity>
          <Image
            source={require("../../../../../assets/png/headphones.png")}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.contentCard}>
          <ProductInfo />
          <PriceBanner />
          <Text style={styles.sectionTitle}>Price Comparison</Text>

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