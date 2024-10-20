import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

import { adjustFontSizeForIOS } from '@/utils/helpers';
import { Chart2Icon, CircleArrowDownIcon, MoneysIcon } from '@/assets/icons';

const INFO_ICONS = [<MoneysIcon />, <Chart2Icon />, <CircleArrowDownIcon />];

const INFO_TEXTS = [
  'You can manage your positions across multiple protocols on Liquid',
  'If you had a position on another protocol, you can Import it into Liquid',
  'You can deposit assets into a pool using Apple Pay or your debit card',
];

const INFO_COLORS = [
  {
    primary: '#EBF1FF', // Container background color
    secondary: '#162664', // Icon container, header, and paragraph color
  },
  {
    primary: '#EBFAFF',
    secondary: '#164564',
  },
  {
    primary: '#EEEBFF',
    secondary: '#2B1664',
  },
];

const Info = () => {
  const [infoSteps, setInfoSteps] = useState(0);

  const currentColors = useSharedValue(INFO_COLORS[0]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(currentColors.value.primary, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    }),
  }));

  const animatedIconContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(currentColors.value.secondary, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    }),
  }));

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    color: withTiming(currentColors.value.secondary, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    }),
  }));

  const animatedParagraphStyle = useAnimatedStyle(() => ({
    color: withTiming(currentColors.value.secondary, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    }),
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setInfoSteps((prevStep) => {
        const nextStep = (prevStep + 1) % INFO_ICONS.length;
        currentColors.value = INFO_COLORS[nextStep];
        return nextStep;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Animated.View style={[styles.infoContainer, animatedContainerStyle]}>
      <Animated.View style={[styles.infoIconContainer, animatedIconContainerStyle]}>{INFO_ICONS[infoSteps]}</Animated.View>

      <View style={styles.infoDetailContainer}>
        <Animated.Text style={[styles.infoHeader, animatedHeaderStyle]}>Did you know?</Animated.Text>
        <Animated.Text style={[styles.infoParagraph, animatedParagraphStyle]}>{INFO_TEXTS[infoSteps]}</Animated.Text>
      </View>
    </Animated.View>
  );
};

export default Info;

const styles = StyleSheet.create({
  infoContainer: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    borderRadius: 20,
  },

  infoIconContainer: {
    width: 40,
    height: 40,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },

  infoDetailContainer: {
    gap: 4,
    flex: 1,
  },

  infoHeader: {
    fontSize: adjustFontSizeForIOS(18, 2),
    lineHeight: 27,
    letterSpacing: -0.36,
    fontWeight: '600',
    fontFamily: 'QuantaGroteskProSemiBold',
  },

  infoParagraph: {
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 21,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },
});
