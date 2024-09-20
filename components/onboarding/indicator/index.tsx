import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import LQDPressAnimation from '@/components/press-animation';

const LQDOnboardingIndicator = ({
  currentStep,
  isPaused,
  timer,
  totalSteps,
  finished,
  togglePause,
}: ILQDOnboardingIndicator) => {
  const actions = [
    require('../../../assets/images/pause.png'),
    require('../../../assets/images/play.png'),
  ];

  const animatedWidthStyle = (index: number) => {
    const progress = useSharedValue(0);

    useEffect(() => {
      if (index === currentStep && !isPaused) {
        if (finished && index === totalSteps - 1) {
          progress.value = 1;
        } else {
          progress.value = withTiming(timer / 5, {
            duration: 1000,
            easing: Easing.linear,
          });
        }
      }
    }, [timer, isPaused, currentStep, finished]);

    return useAnimatedStyle(() => {
      if (index === 0 && currentStep === 0) {
        return { width: `${progress.value * 100}%` };
      } else if (index === 0 && currentStep > 0) {
        return { width: '100%' };
      } else if (index === currentStep) {
        return { width: `${progress.value * 100}%` };
      } else if (index < currentStep) {
        return { width: '100%' };
      } else {
        return { width: '0%' };
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.logoText}>Welcome to Liquid</Text>
        </View>

        <View style={styles.actionContainer}>
          <LQDPressAnimation style={styles.action} onPress={togglePause}>
            <Image source={actions[+isPaused]} style={styles.actionIcon} />
          </LQDPressAnimation>
        </View>
      </View>

      <View style={styles.subContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View key={index} style={styles.indicator}>
            <Animated.View
              style={[styles.progress, animatedWidthStyle(index)]}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default LQDOnboardingIndicator;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: '100%',
    gap: 20,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  logo: {
    width: 30,
    height: 30,
  },
  logoText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 15.84,
    color: '#FFF',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  action: {
    padding: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
  },
  actionIcon: {
    width: 18,
    height: 18,
  },
  indicator: {
    flex: 1,
    height: 4,
    borderRadius: 9999,
    backgroundColor: '#FFFFFF3D',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#FFF',
  },
});
