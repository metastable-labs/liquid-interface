import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { LQDButton } from '@/components';
import Info from './info';
import Step from './step';

const setupIcons = [
  'journal-outline',
  'bar-chart-outline',
  'checkmark-done-circle-outline',
];

const Setup = () => {
  const { router } = useSystemFunctions();
  const [setupStep, setSetupStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);
  const buttonOpacity = useSharedValue(0);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
  }));

  const setupSteps: Array<IStep> = [
    {
      icon: 'journal-outline',
      isCompleted: completedSteps[0],
      subtitle: 'Powered by Coinbase smart wallets',
      title: 'Setting up your Liquid account... ',
    },

    {
      icon: 'bar-chart-outline',
      isCompleted: completedSteps[1],
      subtitle: 'Maximize returns on your asset deposits',
      title: 'Recommending High yield pools...',
    },

    {
      icon: 'checkmark-done-circle-outline',
      isCompleted: completedSteps[2],
      subtitle: 'Protect your account and assets with your biometrics',
      title: 'Securing your Liquid account...',
    },
  ];

  useEffect(() => {
    if (setupStep < 2) {
      const timeout = setTimeout(() => {
        setCompletedSteps((prev) =>
          prev.map((step, index) => (index === setupStep ? true : step))
        );

        const interval = setTimeout(() => {
          setSetupStep((prev) => prev + 1);
        }, 500);

        return () => clearTimeout(interval);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [setupStep]);

  useEffect(() => {
    if (setupStep === 2) {
      buttonOpacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });
    } else {
      buttonOpacity.value = withTiming(0, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });
    }
  }, [setupStep]);

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.header}>Hang on, we’re setting you up...</Text>

          <View style={styles.setupContainer}>
            {setupSteps.map(
              (step, index) =>
                setupStep >= index && (
                  <Step
                    key={index}
                    icon={setupIcons[index]}
                    isCompleted={step.isCompleted}
                    subtitle={step.subtitle}
                    title={step.title}
                  />
                )
            )}
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <Info />

          <Animated.View style={animatedButtonStyle}>
            <LQDButton
              title="Let's go!"
              onPress={() => router.replace('/(tabs)/home/')}
              variant="secondary"
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default Setup;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 54,
    backgroundColor: '#FFF',
  },

  container: {
    paddingTop: 46,
    paddingBottom: Platform.OS === 'ios' ? 36 : 16,
    paddingHorizontal: 16,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },

  topContainer: {
    gap: 24,
  },

  bottomContainer: {
    gap: 41,
  },

  header: {
    color: '#181E00',
    fontSize: 24,
    lineHeight: 26.88,
    letterSpacing: -0.6,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  setupContainer: { alignSelf: 'stretch', justifyContent: 'center' },
});
