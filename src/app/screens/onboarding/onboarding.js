import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { FontSize, Radius, Responsive, Spacing } from '../../../constants/styles';
import { ChevronRight } from 'lucide-react-native';
import * as Keychain from 'react-native-keychain';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../constants/colors';

const DATA = [
  {
    id: '1',
    title: 'Point & Scan',
    description: 'Just point your camera at any barcode. Our AI handles the rest automatically.',
    image: require('../../../../assets/png/qrcode.png'),
  },
  {
    id: '2',
    title: 'Compare Instantly',
    description: 'We check Amazon and major retailers to find the absolute lowest price.',
    image: require('../../../../assets/png/trade.png'),
  },
  {
    id: '3',
    title: 'Price Alert',
    description: 'Save items to your wishlist and get notified when the price drops.',
    image: require('../../../../assets/png/alerts.png'),
  },
];

const Pagination = ({ data, x, screenWidth }) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, i) => {
        const animatedDotStyle = useAnimatedStyle(() => {
          const width = interpolate(
            x.value,
            [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
            [10, 20, 10],
            Extrapolate.CLAMP
          );
          const opacity = interpolate(
            x.value,
            [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
            [0.5, 1, 0.5],
            Extrapolate.CLAMP
          );
          return { width, opacity };
        });

        return <Animated.View key={i} style={[styles.dot, animatedDotStyle]} />;
      })}
    </View>
  );
};


const AnimatedItem = ({ item, index, x, screenWidth }) => {
  const animatedStyle = useAnimatedStyle(() => {
    // We scale from 0.8 to 1 and back to 0.8
    const scale = interpolate(
      x.value,
      [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
      [0.6, 1, 0.6],
      Extrapolate.CLAMP
    );

    // Optional: Add opacity fade for a smoother transition
    const opacity = interpolate(
      x.value,
      [(index - 1) * screenWidth, index * screenWidth, (index + 1) * screenWidth],
      [0.4, 1, 0.4],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.itemContainer, { width: screenWidth }, animatedStyle]}>
      <View style={styles.imageContainer}>
        <Image
          source={item.image}
          style={styles.mainImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </Animated.View>
  );
};

export default function OnboardingScreen({ navigation }) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const flatListRef = useRef(null);
  const x = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const handleNext = async () => {
    if (currentIndex < DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      try {
        await Keychain.setGenericPassword('onboarding_status', 'completed', {
          service: 'com.scanandsave.onboarding',
        });
        navigation.replace('Login');
      } catch (error) {
        console.log("Keychain could not save onboarding status", error);
      }
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  // 2. Updated renderItem to use the AnimatedItem component
  const renderItem = ({ item, index }) => (
    <AnimatedItem
      item={item}
      index={index}
      x={x}
      screenWidth={SCREEN_WIDTH}
    />
  );

  const isLastPage = currentIndex === DATA.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: .8 }}>
        <Animated.FlatList
          ref={flatListRef}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          scrollEventThrottle={16}
        />
      </View>

      <Pagination data={DATA} x={x} screenWidth={SCREEN_WIDTH} />

      <View style={{ paddingHorizontal: Spacing.medium }}>
        <TouchableOpacity
          style={[styles.button, isLastPage && styles.getStartedButton]}
          onPress={handleNext}
        >
          {isLastPage ? (
            <Text style={styles.buttonText}>Get Started</Text>
          ) : (
            <ChevronRight color={colors.primary} size={Responsive.width(30)} />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.large,
  },
  imageContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: Responsive.width(100),
    height: Responsive.height(100),
    resizeMode: 'contain'
  },
  textContainer: {
    flex: 0.3,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSize.xLarge,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: Spacing.small,
  },
  description: {
    fontSize: FontSize.medium,
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  paginationContainer: {
    flex: .4,
    flexDirection: 'row',
    height: Responsive.height(10),
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red'
  },
  dot: {
    height: Responsive.height(10),
    backgroundColor: colors.primary,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  button: {
    backgroundColor: colors.white,
    width: Responsive.width(50),
    height: Responsive.width(50),
    borderRadius: Radius.circle,
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 5,
    position: 'absolute',
    right: Spacing.medium,
    bottom: Spacing.large * 2
  },
  getStartedButton: {
    width: "100%",
    borderRadius: Radius.circle,
    position: 'relative',
    right: 0,
  },
  buttonText: {
    color: colors.black,
    fontSize: FontSize.medium,
    fontWeight: 'bold',
  },
});