import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../../constants/colors';
import { FontSize, Radius, Responsive, Spacing } from '../../../../constants/styles';
import { pickImage } from '../../../../utils/services/imagePicker/imagePicker';
import { Pencil } from 'lucide-react-native';
import { useUpdateProfile } from '../../../../hooks/useProfile/useProfile';

export default function ProfileSection({ user }) {
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const email = user?.email || "xyz@gmail.com"
  const name = user?.full_name || "John Doe"
  const stats = user?.stats

  const [avatar, setAvatar] = useState(user?.avatar || null);

  useEffect(() => {
    if (user?.avatar) {
      setAvatar(user.avatar);
    }
  }, [user?.avatar]);

  const handlePickImage = () => {
    pickImage(
      {},
      (image) => {
        const file = {
          uri: image.uri,
          type: image.type || 'image/jpeg',
          name: image.fileName || `avatar_${Date.now()}.jpg`,
        };

        setAvatar(image.uri);

        updateProfile(
          { avatar: file },
          {
            onError: () => {
              setAvatar(user?.avatar || null);
              Alert.alert('Upload Failed', 'Could not upload image.');
            },
          }
        );
      },
      (error) => Alert.alert('Error', error)
    );
  };

  return (
    <View style={styles.profileSection}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' }}
          style={styles.bannerImage}
        />
        <TouchableOpacity
          style={styles.avatarWrapper}
          onPress={handlePickImage}
          disabled={isPending}
        >
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.fallbackAvatar}>
              <Text style={styles.fallbackText}>
                {name?.charAt(0)?.toUpperCase() || "U"}
              </Text>
            </View>
          )}
          <TouchableOpacity onPress={handlePickImage} style={[styles.editBadge, isPending && { opacity: 0.5 }]}>
            <Pencil size={12} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userEmail}>{email}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats?.total_scanned || 0}</Text>
          <Text style={styles.statLabel}>Scanned</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats?.total_saved || 0}</Text>
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
    bottom: -Spacing.large * 2,
    borderWidth: 4,
    borderColor: colors.background,
    borderRadius: Radius.circle,
    backgroundColor: colors.background,
  },

  fallbackAvatar: {
    width: Responsive.width(90),
    height: Responsive.width(90),
    borderRadius: Radius.circle,
    backgroundColor: '#FFB88C',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fallbackText: {
    fontSize: FontSize.xxLarge,
    fontWeight: 'bold',
    color: '#fff',
  },

  avatar: {
    width: Responsive.width(90),
    height: Responsive.width(90),
    borderRadius: Radius.circle,
    backgroundColor: '#FFB88C',
  },

  editBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: colors.primary,
    borderRadius: Radius.circle,
    padding: 5,
    borderWidth: 2,
    borderColor: colors.background,
  },

  userInfo: {
    alignItems: 'center',
    marginTop: Spacing.xLarge * 1.8,
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