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
          source={{ uri: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' }}
          style={styles.bannerImage}
        />
        <View style={styles.avatarWrapper}>
          <Image
            source={require('../../../../../assets/png/avatar_3.jpg')}
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