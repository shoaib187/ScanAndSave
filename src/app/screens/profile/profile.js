import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
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
import { useNotifications, useUpdateNotifications } from '../../../hooks/useNotifications/useNotifications';

const Profile = () => {
  const navigation = useNavigation()
  const { logout, token } = useAuth()

  const { data, refetch, isRefetching } = useProfile()
  const { data: preferences } = usePreferences()
  const { mutate: updatePreferences } = useUpdatePreferences();
  const { mutate: updateNotifications } = useUpdateNotifications()
  const { data: notificationsData } = useNotifications()

  const user = data?.data || {}


  const { currency, currency_symbol, default_retailer, region } = preferences?.data || user?.preferences || {}


  const [priceDrop, setPriceDrop] = useState(notificationsData?.data?.price_drop ?? false);
  const [weeklyReport, setWeeklyReport] = useState(notificationsData?.data?.weekly_price_report ?? false);



  useEffect(() => {
    if (notificationsData?.data) {
      setPriceDrop(notificationsData.data.price_drop ?? false);
      setWeeklyReport(notificationsData.data.weekly_price_report ?? false);
    }
  }, [notificationsData]);

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
      <Header user={user} showBack title={"Profile"} />
      <ScrollView refreshControl={<RefreshControl onRefresh={refetch} refreshing={isRefetching} />} showsVerticalScrollIndicator={false}>

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
          setChecked={(val) => {
            setPriceDrop(val)
            updateNotifications({ price_drop: val, weekly_price_report: weeklyReport }, {
              onSuccess: () => {
                console.log("Notifications updated successfully");
              },
              onError: (error) => {
                console.error('Update Notifications Error:', error);
                Alert.alert('Error', 'Failed to update notifications. Please try again.');
              },
            })
          }}
        />
        <NotificationButton
          icon={<BarChart3 />}
          title={"Weekly Price Report"}
          subtitle={"Summary of tracked items"}
          checked={weeklyReport}
          setChecked={(val) => {
            setWeeklyReport(val)
            updateNotifications({ price_drop: priceDrop, weekly_price_report: val }, {
              onSuccess: () => {
                console.log("Notifications updated successfully");
              },
              onError: (error) => {
                console.error('Update Notifications Error:', error);
                Alert.alert('Error', 'Failed to update notifications. Please try again.');
              },
            })
          }}
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