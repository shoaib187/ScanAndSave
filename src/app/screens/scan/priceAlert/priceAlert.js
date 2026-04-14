import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../../constants/colors';
import { Spacing } from '../../../../constants/styles';
import Header from '../../../components/common/header/header';
import { PriceAlertCard } from '../../../components/priceAlert/priceAlertcard/priceAlertCard';


export default function PriceAlerts() {
  return (
    <SafeAreaView style={styles.container}>
      <Header showBack title={"Price alerts"} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <PriceAlertCard
          title="Sony WH-1000XM5"
          currentPrice={279}
          targetInitial={250}
          daysAgo={2}
        />
        <PriceAlertCard
          title="Apple Watch Series 9"
          currentPrice={329}
          targetInitial={299}
          daysAgo={5}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  scrollContent: {
    padding: Spacing.medium,
  },

});