import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';

const FastImage = ({ uri, style }) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri }}
        style={StyleSheet.absoluteFillObject}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        resizeMode="cover"
      />

      {!loading && (
        <View style={styles.placeholderContainer}>
          <Image
            source={require('../../../assets/png/logo-transparent.png')}
            style={styles.placeholderImage}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F3F4F6',
  },
  placeholderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#11111180',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderImage: {
    width: '80%',
    height: '80%',
    opacity: 0.6
  },
});

export default FastImage;