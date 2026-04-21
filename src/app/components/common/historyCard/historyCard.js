import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useDeleteHistory } from '../../../../hooks/useHistory/useHistory';


export default function HistoryCard({ item }) {
  const product = item?.product_id || {};
  const { mutate: deleteHistory } = useDeleteHistory();

  const name = item?.name || product?.name || "Unknown Product";
  const category = item?.category || product?.category || "Unknown Category";
  const price = item?.price || product?.price || 0;

  const handleDelete = () => {
    Alert.alert("Delete History", "Are you sure you want to delete this history?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteHistory(item?._id, {
          onError: (error) => {
            console.error('Delete History Error:', error);
            Alert.alert("Error", "Failed to delete history. Please try again.");
          },
        }),

      }
    ]);
  }

  return (
    <TouchableOpacity onLongPress={handleDelete} style={styles.card}>
      <View style={styles.cardLeft}>
        {/* <View style={styles.iconContainer}>
          <IconComponent size={Responsive.width(26)} color="#000" strokeWidth={1.5} />
        </View> */}
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{name}</Text>
          <Text numberOfLines={1} style={styles.itemSubtitle}>{category}</Text>
        </View>
      </View>
      <Text style={styles.priceText}>{price}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F1E8', // Signature background color
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  backButton: {
    backgroundColor: '#FFF',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  headerTextContainer: {
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
    marginBottom: 25,
  },
  tab: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderWidth: 1.5,
    borderColor: '#9E7E4D', // Brownish border from the screenshot
    backgroundColor: '#FFF',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
  activeTabText: {
    color: '#000',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 28,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A9B65', // Green price color
  },
});