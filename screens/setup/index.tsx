import { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { LQDButton } from '@/components';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import LQDLoadingStep from '@/components/loading-step';
import { useUserActions } from '@/store/user/actions';
import { useSmartAccountActions } from '@/store/smartAccount/actions';
import Info from './info';
import { ChartIcon, ShieldTickIcon, SwatchIcon } from '@/assets/icons';

const Setup = () => {
  const { router } = useSystemFunctions();
  const [setupStep, setSetupStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([false, false, false]);
  const buttonOpacity = useSharedValue(0);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
  }));

  const progressToNextStep = useCallback(() => {
    setCompletedSteps((prev) => prev.map((step, index) => (index + 1 === setupStep ? true : step)));

    const interval = setTimeout(() => {
      setSetupStep((prev) => prev + 1);
    }, 500);

    return () => clearTimeout(interval);
  }, [setCompletedSteps, setSetupStep, setupStep]);

  const setupSteps: Array<ILQDLoadingStep> = [
    {
      icon: <SwatchIcon />,
      isCompleted: completedSteps[0],
      subtitle: 'Powered by Coinbase smart wallets',
      title: 'Setting up your Liquid account... ',
    },

    {
      icon: <ChartIcon />,
      isCompleted: completedSteps[1],
      subtitle: 'Maximize returns on your asset deposits',
      title: 'Recommending High yield pools...',
    },

    {
      icon: <ShieldTickIcon />,
      isCompleted: completedSteps[2],
      subtitle: 'Protect your account and assets with your biometrics',
      title: 'Securing your Liquid account...',
      isLast: true,
    },
  ];
  
  const { getUser } = useUserActions();
  const { create: createSmartAccount } = useSmartAccountActions();

  useEffect(
    function progressSteps() {
      if (setupStep === 1) {
        const firstStepDelayInMs = 1000 * 1; // 1s
        const timeout = setTimeout(() => {
          const user = getUser();
          if (!user) throw new Error('User not found');
          createSmartAccount(user.username).then(progressToNextStep);
        }, firstStepDelayInMs);

        return () => clearTimeout(timeout);
      } else if (setupStep < 3) {
        const subsequentStepsDelayInMs = 1000 * 3; // 3s
        const timeout = setTimeout(progressToNextStep, subsequentStepsDelayInMs);

        return () => clearTimeout(timeout);
      }
    },
    [setupStep]
  );

  useEffect(
    function revealBottomButton() {
      if (setupStep === 3) {
        buttonOpacity.value = withTiming(1, {
          duration: 500,
          easing: Easing.inOut(Easing.ease),
        });
      }
    },
    [setupStep]
  );


  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.header}>Hang on, we’re setting you up...</Text>

          <View style={styles.setupContainer}>
            {setupSteps.map(
              (step, index) =>
                setupStep >= index + 1 && (
                  <LQDLoadingStep
                    key={index}
                    icon={step.icon}
                    isCompleted={step.isCompleted}
                    subtitle={step.subtitle}
                    title={step.title}
                    isLast={step.isLast}
                  />
                )
            )}
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <Info />

          <Animated.View style={animatedButtonStyle}>
            <LQDButton title="Let's go!" onPress={() => router.replace('/(tabs)/home/')} variant="secondary" />
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
    fontSize: adjustFontSizeForIOS(24, 3),
    lineHeight: 26.88,
    letterSpacing: -0.6,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  setupContainer: { alignSelf: 'stretch', justifyContent: 'center' },
});
