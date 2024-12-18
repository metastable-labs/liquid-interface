import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from 'react-native-reanimated';
import { adjustFontSizeForIOS } from '@/utils/helpers';

const LQDOnboardingIndicator = ({ currentStep, isPaused, timer, totalSteps, finished, togglePause }: ILQDOnboardingIndicator) => {
  const actions = [require('../../../assets/images/pause.png'), require('../../../assets/images/play.png')];
  const [progressValues, setProgressValues] = useState<number[]>(new Array(totalSteps).fill(0));

  const animatedWidthStyle = (index: number) => {
    const progress = useSharedValue(progressValues[index]);

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

      if (index === currentStep && progress.value !== progressValues[index]) {
        setProgressValues((prevValues) => {
          const newValues = [...prevValues];
          newValues[index] = progress.value;
          return newValues;
        });
      }

      if (index < currentStep) {
        progress.value = 1;
      } else if (index > currentStep) {
        progress.value = 0;
      }
    }, [timer, isPaused, currentStep, finished]);

    return useAnimatedStyle(() => ({
      width: `${progress.value * 100}%`,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.logoText}>Welcome to Liquid</Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.action} onPress={togglePause}>
            <Image source={actions[+isPaused]} style={styles.actionIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.subContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View key={index} style={styles.indicator}>
            <Animated.View style={[styles.progress, animatedWidthStyle(index)]} />
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
    fontSize: adjustFontSizeForIOS(12, 2),
    fontWeight: '500',
    lineHeight: 15.84,
    color: '#FFF',
    fontFamily: 'AeonikMedium',
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
