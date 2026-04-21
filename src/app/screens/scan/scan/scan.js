import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Scan, UserCircle2 } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontSize, Responsive, Spacing } from '../../../../constants/styles';
import { colors } from '../../../../constants/colors';
import Header from '../../../components/common/header/header';
import { useProfile } from '../../../../hooks/useProfile/useProfile';


export default function ScanMain({ navigation }) {
  const { data } = useProfile()
  const user = data?.data || {}
  return (
    <SafeAreaView style={styles.container}>
      <Header
        user={user}
        rightIcon={<UserCircle2 size={Responsive.width(30)} color="#333" strokeWidth={1.2} />}
        onRightPress={() => navigation.navigate('Profile')}
      />
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.scanButtonCircle}
          onPress={() => navigation.navigate('Scanner')}
          activeOpacity={0.8}
        >
          <View style={styles.iconContainer}>
            <Scan size={60} color="black" strokeWidth={2.5} />
          </View>
          <Text style={styles.startScanText}>Start Scan</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Save an average of 15% on your daily essentials by comparing prices instantly.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFE6', // The specific off-white from your screenshot
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButtonCircle: {
    width: Responsive.width(160),
    height: Responsive.width(160),
    borderRadius: 130,
    backgroundColor: '#EFEFE6',
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow/Elevation to match the soft glow in screenshot
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  iconContainer: {
    marginBottom: 10,
  },
  startScanText: {
    fontSize: FontSize.medium,
    fontWeight: 'bold',
    color: colors.black,
  },
  footer: {
    paddingHorizontal: Spacing.large,
    marginTop: Spacing.large
  },
  footerText: {
    fontSize: FontSize.small + 2,
    color: '#444',
    textAlign: 'center',
    lineHeight: 20,
  },
});