import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { colors } from '../../../../constants/colors';
import { FontSize, Radius, Responsive, Spacing } from '../../../../constants/styles';

export default function ProfileSection() {
  return (
    <View style={styles.profileSection}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926' }}
          style={styles.bannerImage}
        />
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' }}
            style={styles.avatar}
          />
        </View>
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Alex Johnson</Text>
        <Text style={styles.userEmail}>alexjohn@email.com</Text>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>47</Text>
          <Text style={styles.statLabel}>Scanned</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>17</Text>
          <Text style={styles.statLabel}>Saved</Text>
        </View>
      </View>
    </View>
  )
}





const styles = StyleSheet.create({

  headerContainer: {
    alignItems: 'center',
  },

  bannerImage: {
    width: '95%',
    height: Responsive.height(140),
    borderRadius: Radius.xLarge,
    marginTop: Spacing.small,
  },

  avatarWrapper: {
    position: 'absolute',
    bottom: -Spacing.large,
    borderWidth: 4,
    borderColor: colors.background,
    borderRadius: Radius.circle,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: Radius.circle,
    backgroundColor: '#FFB88C',
  },

  userInfo: {
    alignItems: 'center',
    marginTop: Spacing.large,
  },

  userName: {
    fontSize: FontSize.xLarge,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },

  userEmail: {
    fontSize: FontSize.small,
    color: colors.textSecondary,
    marginTop: Spacing.tiny,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.medium,
    marginVertical: Spacing.large,
  },

  statCard: {
    backgroundColor: colors.white,
    paddingVertical: Spacing.medium,
    paddingHorizontal: Spacing.large,
    borderRadius: Radius.large,
    alignItems: 'center',
    width: '43%',
  },

  statNumber: {
    fontSize: FontSize.large,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },

  statLabel: {
    fontSize: FontSize.small,
    color: colors.textSecondary,
  },
});