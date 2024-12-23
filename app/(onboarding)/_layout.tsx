import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, Platform, View, StatusBar as RNStatusBar, Pressable, Text, Modal } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { LQDButton } from '@/components';
import { LQDOnboardingIndicator } from '@/components/onboarding';

import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';

import { adjustFontSizeForIOS } from '@/utils/helpers';
import { CloseIcon } from '@/assets/icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const getCurrentStep = (pathname: string) => {
  switch (pathname) {
    case '/step2':
      return 1;
    case '/step3':
      return 2;
    case '/step4':
      return 3;
    default:
      return 0;
  }
};

const url = 'https://metastablelabs.notion.site/Terms-of-Use-149716767cb4802094c6d36593120eea';

export default function OnboardingTabLayout() {
  const insets = useSafeAreaInsets();
  const { router, pathname } = useSystemFunctions();

  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const [showTC, setShowTC] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep = getCurrentStep(pathname);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const openTC = () => {
    setShowTC((prev) => !prev);
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
        router.push('/(onboarding)/step4');
        break;
      case '/step4':
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setFinished(true);
        setIsPaused(true);
        break;
    }
  };

  const navigateToPreviousScreen = () => {
    switch (pathname) {
      case '/step2':
        router.push('/(onboarding)/step1');
        break;
      case '/step3':
        router.push('/(onboarding)/step2');
        break;
      case '/step4':
        router.push('/(onboarding)/step3');
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
    if (pathname !== '/step4' && finished) {
      setFinished(false);
      setIsPaused(false);
    }
  }, [pathname]);

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.indicator}>
        <LQDOnboardingIndicator
          timer={timer}
          isPaused={isPaused}
          currentStep={currentStep}
          totalSteps={4}
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
        <Tab.Screen
          name="step4"
          component={Step4}
          options={{
            title: 'Step4',
          }}
        />
      </Tab.Navigator>

      <Pressable
        onPress={() => {
          if (currentStep > 0) {
            navigateToPreviousScreen();
          }
        }}
        style={styles.prev}
      />
      <Pressable
        onPress={() => {
          if (currentStep < 3) {
            navigateToNextScreen();
          }
        }}
        style={styles.next}
      />

      <View style={styles.action}>
        <LQDButton variant="secondary" onPress={() => router.replace('/(signup)')} title="Get started" />

        <Pressable onPress={openTC}>
          <Text style={styles.tcWrapper}>
            <Text style={styles.tcText}>By clicking continue, you agree to Liquid’s</Text>
            <Text style={styles.boldTcText}> Terms of Service</Text>
            <Text style={styles.tcText}> and </Text>
            <Text style={styles.boldTcText}>Privacy Policy</Text>
          </Text>
        </Pressable>
      </View>

      <Modal visible={showTC} animationType="slide">
        <View style={{ flex: 1 }}>
          <Pressable onPress={openTC} style={[styles.closeIcon, { paddingTop: insets.top }]}>
            <CloseIcon height={30} width={30} />
          </Pressable>
          <WebView
            source={{ uri: url }}
            style={styles.webview}
            startInLoadingState={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },

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

  prev: {
    flex: 1,
    position: 'absolute',
    height: Dimensions.get('window').height,
    left: 0,
    width: 65,
  },

  next: {
    flex: 1,
    position: 'absolute',
    height: Dimensions.get('window').height,
    right: 0,
    width: 65,
  },

  tcText: {
    color: '#64748B',
    fontFamily: 'AeonikRegular',
    fontWeight: '600',
    fontSize: adjustFontSizeForIOS(11, 2),
    lineHeight: 17,
  },

  boldTcText: {
    color: '#64748B',
    fontFamily: 'AeonikBold',
    fontWeight: '700',
    fontSize: adjustFontSizeForIOS(11, 2),
    lineHeight: 17,
  },

  closeIcon: {
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },

  tcWrapper: {
    textAlign: 'center',
    marginTop: 13,
    marginHorizontal: 30,
  },
});
