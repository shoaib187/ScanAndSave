import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  SectionList,
  Alert,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../../constants/colors';
import { FontSize, Responsive, Spacing } from '../../../../constants/styles';
import Header from '../../../components/common/header/header';
import { PriceAlertCard } from '../../../components/priceAlert/priceAlertcard/priceAlertCard';
import { useProducts } from '../../../../hooks/useProducts/useProducts';
import { useCreatePriceAlert, useDeletePriceAlert, usePriceAlerts } from '../../../../hooks/useAlerts/useAlerts';
import ProductItem from '../../../components/priceAlert/productItem/productItem';
import SectionHeader from '../../../components/priceAlert/sectionHeader/sectionHeader';
import { BellIcon } from 'lucide-react-native';



function EmptyAlerts() {
  return (
    <View style={emptyStyles.container}>
      <BellIcon size={Responsive.width(50)} color={colors.secondary} />
      <Text style={emptyStyles.text}>No price alerts yet</Text>
      <Text style={emptyStyles.sub}>
        Tap "+ Alert" on any product below to get notified when its price drops.
      </Text>
    </View>
  );
}


export default function PriceAlerts() {
  const { data: productsData, isLoading: loadingProducts } = useProducts();
  const { data: alertsData, isLoading: loadingAlerts } = usePriceAlerts();
  const { mutate: createPriceAlert } = useCreatePriceAlert();
  const { mutate: deletePriceAlert } = useDeletePriceAlert()

  const [creatingId, setCreatingId] = useState(null);

  const products = productsData?.data ?? [];
  const priceAlerts = alertsData?.data ?? [];

  const handleCreateAlert = useCallback(
    (product) => {
      if (!product?._id) return;
      setCreatingId(product._id);

      const payload = {
        product_id: product._id,
        target_price: product.best_price ? product.best_price - 10 : 100,
        preferred_retailer: null,
      };

      createPriceAlert(payload, {
        onSuccess: () => {
          setCreatingId(null);
          Alert.alert(
            'Alert Created! 🔔',
            `We'll notify you when ${product.name} drops in price.`
          );
        },
        onError: (err) => {
          setCreatingId(null);
          Alert.alert(
            'Error',
            err?.message ?? 'Could not create alert. Please try again.'
          );
        },
      });
    },
    [createPriceAlert]
  );


  const handleDeleteAlert = (alertId) => {
    Alert.alert(
      'Delete Alert',
      'Are you sure you want to delete this alert?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deletePriceAlert(alertId, {
              onSuccess: () => {
                Alert.alert('Deleted', 'The price alert has been deleted.');
              },
              onError: (err) => {
                Alert.alert(
                  'Error',
                  err?.message ?? 'Could not delete alert. Please try again.'
                );
              },
            });
          }
        },
      ]
    );
  }

  // Build SectionList sections
  const sections = [
    {
      key: 'alerts',
      title: 'Price Alerts',
      count: priceAlerts.length,
      data: priceAlerts.length > 0 ? priceAlerts : [{ _empty: true }],
      renderItem: ({ item }) => {
        if (item._empty) return <EmptyAlerts />;
        return (
          <PriceAlertCard
            item={item}
            title={item.product?.name ?? 'Product'}
            currentPrice={item.current_price ?? item.product?.best_price ?? 0}
            targetInitial={item.target_price ?? 0}
            onDelete={() => handleDeleteAlert(item?._id)}
            daysAgo={
              item.createdAt
                ? Math.floor(
                  (Date.now() - new Date(item.createdAt)) /
                  (1000 * 60 * 60 * 24)
                )
                : 0
            }
          />
        );
      },
    },
    {
      key: 'products',
      title: 'All Products',
      count: products.length,
      data: products,
      renderItem: ({ item }) => (
        <ProductItem
          item={item}
          onCreateAlert={handleCreateAlert}
          creatingId={creatingId}
        />
      ),
    },
  ];

  const isLoading = loadingProducts || loadingAlerts;

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack title="Price Alerts" />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={colors.primary ?? '#2563eb'}
          />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item, index) =>
            item._id ?? item._empty ?? String(index)
          }
          renderSectionHeader={({ section }) => (
            <SectionHeader title={section.title} count={section.count} />
          )}
          renderItem={({ item, section }) => section.renderItem({ item })}
          contentContainerStyle={styles.listContent}
          stickySectionHeadersEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: Spacing.medium,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: FontSize.medium,
    color: colors.secondary ?? '#888',
  },
});


const emptyStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: Spacing.medium,
  },
  icon: { fontSize: 36, marginBottom: 8 },
  text: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text ?? '#111',
    marginBottom: 4,
  },
  sub: {
    fontSize: 13,
    color: colors.textSecondary ?? '#888',
    textAlign: 'center',
    lineHeight: 18,
  },
});