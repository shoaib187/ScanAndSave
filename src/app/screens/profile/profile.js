import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { BarChart3, BellDotIcon } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../constants/colors';
import ProfileSection from '../../components/profile/profileSection/profileSection';
import PrefrencesButton from '../../components/common/prefrencesButton/prefrencesButton';
import RetailerButton from '../../components/common/retailerButton/retailerButton';
import NotificationButton from '../../components/common/notificationButton/notificationButton';

import { FontSize, Radius, Spacing } from '../../../constants/styles';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/common/header/header';
import { useAuth } from '../../../configs/authContext/authContext';
import { logout as logoutApi } from '../../../utils/auth/api';
import { useProfile } from '../../../hooks/useProfile/useProfile';
import { usePreferences, useUpdatePreferences } from '../../../hooks/usePreferences/usePreferences';

const Profile = () => {
  const navigation = useNavigation()
  const { logout, token } = useAuth()

  const { data } = useProfile()
  const { data: preferences } = usePreferences()
  const { mutate: updatePreferences } = useUpdatePreferences();
  const user = data?.data || {}

  const { currency, currency_symbol, default_retailer, region } = preferences?.data || user?.preferences || {}

  // Notifications still come from user profile (no notifications API)
  const notifications = user?.notifications || {}
  const [priceDrop, setPriceDrop] = useState(notifications?.price_drop ?? false);
  const [weeklyReport, setWeeklyReport] = useState(notifications?.weekly_price_report ?? false);

  const logoutCallback = async () => {
    const res = await logoutApi(token)
    if (res?.success) logout()
  }

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logoutCallback },
    ], { cancelable: true });
  };

  // Called after returning from RegionSelection screen
  const handleRegionSave = ({ region, currency, currency_symbol }) => {
    updatePreferences({ region, currency, currency_symbol, default_retailer }, {
      onSuccess: () => {
        console.log("Region preferences updated successfully");
      }
    });
  };

  // Called after returning from Retailers screen
  const handleRetailerSave = (retailer) => {
    updatePreferences({ region, currency, currency_symbol, default_retailer: retailer });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack title={"Profile"} />
      <ScrollView showsVerticalScrollIndicator={false}>

        <ProfileSection user={user} />

        <Text style={styles.sectionTitle}>Preferences</Text>

        <PrefrencesButton
          currency={currency}
          region={region}
          currency_symbol={currency_symbol}
          default_retailer={default_retailer}
          onPress={() => navigation.navigate("RegionSelection", { onSave: handleRegionSave })}
        />
        <RetailerButton
          default_retailer={default_retailer}
          onPress={() => navigation.navigate("Retailers", { onSave: handleRetailerSave })}
        />

        <Text style={styles.sectionTitle}>Notification</Text>
        <NotificationButton
          onPress={() => navigation.navigate("PriceAlerts")}
          icon={<BellDotIcon />}
          title={"Price Drop"}
          subtitle={"Notify when prices falls"}
          checked={priceDrop}
          setChecked={setPriceDrop} // no API until you have a notifications endpoint
        />
        <NotificationButton
          icon={<BarChart3 />}
          title={"Weekly Price Report"}
          subtitle={"Summary of tracked items"}
          checked={weeklyReport}
          setChecked={setWeeklyReport} // same
        />

        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  sectionTitle: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
    marginHorizontal: Spacing.medium,
    marginTop: Spacing.medium,
    marginBottom: Spacing.small,
    color: colors.textPrimary,
  },

  logout: {
    marginHorizontal: Spacing.medium,
    marginTop: Spacing.medium,
    marginBottom: Spacing.small,
    backgroundColor: '#FEE2E2',
    padding: Spacing.medium,
    borderRadius: Radius.medium,
  },

  logoutText: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default Profile;