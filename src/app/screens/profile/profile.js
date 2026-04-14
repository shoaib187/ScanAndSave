import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { BarChart3, BellDotIcon } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../constants/colors';
import ProfileSection from '../../components/profile/profileSection/profileSection';
import PrefrencesButton from '../../components/common/prefrencesButton/prefrencesButton';
import RetailerButton from '../../components/common/retailerButton/retailerButton';
import NotificationButton from '../../components/common/notificationButton/notificationButton';
import Button from '../../components/common/button/iconButton';
import { FontSize, Spacing } from '../../../constants/styles';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/common/header/header';

const Profile = () => {
  const navigation = useNavigation()
  const [priceDrop, setPriceDrop] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);

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
        <Button variant='secondary' label='Logout' size='large' />
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
});

export default Profile;