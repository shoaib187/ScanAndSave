import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Spacing } from '../../constants/responsive/responsive';

const { width } = Dimensions.get('window');

const Picker = ({
  data = [],
  selectedValue = null,
  onValueChange = () => { },
  placeholder = 'Select an option',
  labelExtractor = (item) => item?.label || item?.toString(),
  valueExtractor = (item) => item?.value || item,
  title,
  style
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(selectedValue);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setSelected(selectedValue);
  }, [selectedValue]);

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const handleSelect = (item, index) => {
    const value = valueExtractor(item);
    setSelected(value);
    onValueChange(value, index);
    closeModal();
  };

  const getSelectedLabel = () => {
    if (selected === null || selected === undefined) return null;
    const item = data.find((d) => valueExtractor(d) === selected);
    return item ? labelExtractor(item) : selected?.toString();
  };

  const selectedLabel = getSelectedLabel();

  return (
    <>
      {title && <Text style={styles.title}>{title}</Text>}

      <TouchableOpacity
        style={[styles.pickerContainer, style]}
        onPress={openModal}
        activeOpacity={0.7}
      >
        <View style={styles.pickerContent}>
          <Text style={[
            styles.placeholderText,
            selectedLabel ? styles.selectedText : { color: '#999' }
          ]}>
            {selectedLabel || placeholder}
          </Text>
          <Ionicons
            name="chevron-down"
            size={20}
            color="#666"
            style={styles.chevronIcon}
          />
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[
            styles.modalContent,
            {
              opacity: fadeAnim,
              // maxHeight: 300,
            }
          ]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Option</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons
                  name="close"
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                const isSelected = valueExtractor(item) === selected;
                const label = labelExtractor(item);
                const icon = item?.icon;

                return (
                  <TouchableOpacity
                    onPress={() => handleSelect(item, index)}
                    activeOpacity={0.6}
                  >
                    <View style={[
                      styles.itemContainer,
                      isSelected && styles.selectedItem
                    ]}>
                      <View style={styles.itemLeftContent}>
                        {icon && (
                          <Ionicons
                            name={icon}
                            size={20}
                            color={isSelected ? '#007AFF' : '#666'}
                            style={styles.itemIcon}
                          />
                        )}
                        <Text style={[
                          styles.itemText,
                          isSelected && styles.selectedItemText
                        ]}>
                          {label}
                        </Text>
                      </View>
                      {isSelected && (
                        <Ionicons
                          name="checkmark"
                          size={20}
                          color="#007AFF"
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />

            {data.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No options available</Text>
              </View>
            )}
          </Animated.View>

          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={closeModal}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    // paddingVertical: 12,
    height: 40,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeholderText: {
    fontSize: 14,
    flex: 1,
  },
  selectedText: {
    color: '#000',
    fontWeight: '500',
  },
  chevronIcon: {
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.md,
  },
  modalContent: {
    backgroundColor: 'white',
    width: width * 0.92,
    maxHeight: 500,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 2,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  itemLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  selectedItem: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  selectedItemText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});

export default Picker;