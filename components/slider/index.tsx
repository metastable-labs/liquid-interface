import React, { useState, useRef } from 'react';
import { StyleSheet, FlatList, Animated, Dimensions, View, Text, Image, StyleProp, ViewStyle } from 'react-native';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { ISlider, Slider } from './types';
const { width } = Dimensions.get('window');

let PADDING_HORIZONTAL = 2 * 18; // Left and right padding
let SLIDE_WIDTH = width - PADDING_HORIZONTAL; // Carousel Width
let INDICATOR_SIDES = 6; // Length of each side of the indicator
let CAROUSEL_HEIGHT = 82;

const LQDSlider = ({ items }: ISlider) => {
  const slider1 = require('../../assets/images/slider-1.png');
  const slider2 = require('../../assets/images/slider-2.png');
  const scrollX = useRef(new Animated.Value(0)).current;
  const [viewIndex, setViewIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const images: Record<string, any> = {
    strategy: slider1,
    deposit: slider2,
  };

  const onViewChangeRef = useRef(({ viewableItems }: { viewableItems: any[] }) => {
    setViewIndex(viewableItems[0]?.index);
  });

  const renderItem = ({ item }: { item: Slider }) => {
    const { title, subTitle, variant } = item;
    const bg = variant === 'deposit' ? '#EFFAF6' : '#EEEBFF';
    const borderColor = variant === 'deposit' ? '#CBF5E5' : '#CAC2FF';
    const textColor = variant === 'deposit' ? '#156146' : '#2B1664';
    const imageDimensions = variant === 'deposit' ? { width: 114, height: 53, bottom: 0 } : { width: 130, height: 75, bottom: null };

    return (
      <View style={[styles.slideContainer, { backgroundColor: bg, borderColor: borderColor }]}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: textColor }]}>{title}</Text>
          <Text style={[styles.subTitle, { color: textColor }]}>{subTitle}</Text>
        </View>
        <Image source={images[variant || '']} style={[styles.image, imageDimensions]} resizeMode="contain" />
      </View>
    );
  };

  return (
    <View>
      <Animated.View style={styles.carouselWrap}>
        <FlatList
          data={items}
          horizontal
          ref={flatListRef}
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewChangeRef.current}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
          bounces={false}
          renderItem={renderItem}
          style={{ overflow: 'hidden' }}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </Animated.View>
      {items.length > 0 && (
        <View style={styles.eachDotsWrap}>
          {items.map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.eachIndicatorDots,
                {
                  backgroundColor: viewIndex === index ? '#4691FE' : '#D4E6FF',
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselWrap: {
    height: CAROUSEL_HEIGHT,
    position: 'relative',
  },
  eachDotsWrap: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: INDICATOR_SIDES / 2,
    backgroundColor: 'transparent',
    marginTop: 10,
  },
  eachIndicatorDots: {
    width: INDICATOR_SIDES,
    height: INDICATOR_SIDES,
    borderRadius: INDICATOR_SIDES / 2,
  },
  slideContainer: {
    width: SLIDE_WIDTH,
    justifyContent: 'center',
    paddingHorizontal: 20,
    position: 'relative',
    borderWidth: 1,
    borderRadius: 12,
    zIndex: 5,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  textContainer: {
    width: '70%',
    gap: 6,
  },
  image: {
    position: 'absolute',
    right: -20,
    height: 60,
    width: 114,
    zIndex: 0,
  },
  title: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(16, 1),
    lineHeight: 17.92,
    fontWeight: '700',
    fontFamily: 'QuantaGroteskProBold',
  },
  subTitle: {
    color: '#1E293B',
    fontSize: adjustFontSizeForIOS(11, 1),
    lineHeight: 13.64,
    fontWeight: '400',
    fontFamily: 'AeonikRegular',
  },
  contentContainerStyle: {
    overflow: 'hidden',
    gap: 20,
    paddingHorizontal: 17,
  },
});

export default LQDSlider;
