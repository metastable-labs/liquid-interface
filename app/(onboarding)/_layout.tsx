import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, Platform, View, StatusBar as RNStatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StatusBar } from 'expo-status-bar';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { LQDButton } from '@/components';
import { LQDOnboardingIndicator } from '@/components/onboarding';

import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';

const Tab = createMaterialTopTabNavigator();

const getCurrentStep = (pathname: string) => {
  switch (pathname) {
    case '/step2':
      return 1;
    case '/step3':
      return 2;
    default:
      return 0;
  }
};

export default function OnboardingTabLayout() {
  const { router, pathname } = useSystemFunctions();

  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep = getCurrentStep(pathname);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const navigateToNextScreen = () => {
    switch (pathname) {
      case '/step1':
        router.push('/(onboarding)/step2');
        break;
      case '/step2':
        router.push('/(onboarding)/step3');
        break;
      case '/step3':
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setFinished(true);
        setIsPaused(true);
        break;
    }
  };

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev >= 5) {
            navigateToNextScreen();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, pathname]);

  useEffect(() => {
    setTimer(0);
    if (pathname !== '/step3' && finished) {
      setFinished(false);
      setIsPaused(false);
    }
  }, [pathname]);

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.indicator}>
        <LQDOnboardingIndicator
          timer={timer}
          isPaused={isPaused}
          currentStep={currentStep}
          totalSteps={3}
          togglePause={togglePause}
          finished={finished}
        />
      </View>

      <Tab.Navigator
        initialRouteName="step1"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarShowIcon: false,
          swipeEnabled: true,
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tab.Screen
          name="step1"
          component={Step1}
          options={{
            title: 'Step1',
          }}
        />
        <Tab.Screen
          name="step2"
          component={Step2}
          options={{
            title: 'Step2',
          }}
        />
        <Tab.Screen
          name="step3"
          component={Step3}
          options={{
            title: 'Step3',
          }}
        />
      </Tab.Navigator>

      <View style={styles.action}>
        <LQDButton onPress={() => router.replace('/(signup)')} title="Let's go!" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 54,
    paddingHorizontal: 16,
    zIndex: 1,
    justifyContent: 'space-between',
  },
  action: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 33 : 16,
    width: Dimensions.get('window').width,
  },
});
