import { View, Text, StyleSheet, Alert, TouchableOpacity, Share } from 'react-native';
import React from 'react';
import { Bookmark, Heart, Share2 } from 'lucide-react-native';
import { colors } from '../../../../constants/colors';
import { FontSize, Responsive, Spacing } from '../../../../constants/styles';
import { useAddFavorite, useRemoveFavorite } from '../../../../hooks/useFavorites/useFavorites';

export default function ProductInfo({ name, description, category, id, favorites, url }) {
  const { mutate: addToFavorites } = useAddFavorite();
  const { mutate: removeFromFavorites } = useRemoveFavorite();

  const favoritesProducts = favorites?.data || [];
  const favoriteEntry = favoritesProducts.find(f => f.product_id?._id === id);
  const isFavorited = !!favoriteEntry;


  const handleAddToFavorites = () => {
    if (isFavorited) {
      removeFromFavorites(id, {
        onSuccess: () => {
          Alert.alert("Removed from Favorites", "This product has been removed from your favorites.");
        },
        onError: (error) => {
          console.error('Remove from Favorites Error:', error);
        },
      });
      return;
    }
    else {
      addToFavorites(id, {
        onSuccess: () => {
          Alert.alert("Added to Favorites", "This product has been added to your favorites.");
        },
        onError: (error) => {
          console.error('Add to Favorites Error:', error);
        },

      });
    }
  }


  const handleShare = async () => {
    try {
      await Share.share({
        title: name,
        message: url
          ? `Check out ${name} on ScanAndSave!\n${url}`
          : `Check out ${name} on ScanAndSave!`,
      });
    } catch (error) {
      console.error('Share Error:', error);
    }
  };


  return (
    <View style={styles.headerRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.productTitle}>
          {name}
        </Text>
        <Text style={styles.categoryText}>
          {category || 'Unknown Category'}
        </Text>
      </View>

      <View style={styles.actionIcons}>
        <TouchableOpacity onPress={handleAddToFavorites}>
          <Heart
            size={Responsive.width(22)}
            color={isFavorited ? 'red' : 'black'}
            fill={isFavorited ? 'red' : 'transparent'}
          />
        </TouchableOpacity>
        {/* <Bookmark size={Responsive.width(22)} color={colors.textPrimary} /> */}
        <TouchableOpacity onPress={handleShare}>
          <Share2 size={Responsive.width(22)} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.medium,
  },

  productTitle: {
    fontSize: FontSize.large,
    fontWeight: '700',
    color: colors.textPrimary,
    width: '85%',
  },

  categoryText: {
    fontSize: FontSize.small,
    color: colors.textSecondary,
    marginTop: Spacing.tiny,
  },

  actionIcons: {
    flexDirection: 'row',
    gap: Spacing.small,
  },
});