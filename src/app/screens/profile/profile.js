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

const Profile = () => {
  const navigation = useNavigation()
  const { logout } = useAuth()
  const [priceDrop, setPriceDrop] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => logout() },
      ],
      { cancelable: true },
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <Header showBack title={"Profile"} />
      <ScrollView showsVerticalScrollIndicator={false}>

        <ProfileSection />

        <Text style={styles.sectionTitle}>Preferences</Text>

        <PrefrencesButton onPress={() => navigation.navigate("RegionSelection")} />
        <RetailerButton onPress={() => navigation.navigate("Retailers")} />

        <Text style={styles.sectionTitle}>Notification</Text>
        <NotificationButton onPress={() => navigation.navigate("PriceAlerts")} icon={<BellDotIcon />} title={"Price Drop"} subtitle={"Notify when prices falls"} checked={priceDrop} setChecked={setPriceDrop} />
        <NotificationButton icon={<BarChart3 />} title={"Weekly Price Report"} subtitle={"Summary of tracked items"} checked={weeklyReport} setChecked={setWeeklyReport} />
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