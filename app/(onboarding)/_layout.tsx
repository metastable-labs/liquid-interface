import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  View,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { LQDButton } from "@/components";
import { LQDOnboardingIndicator } from "@/components/onboarding";
import Step1 from ".";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";

const Tab = createMaterialTopTabNavigator();

const getCurrentStep = (pathname: string) => {
  switch (pathname) {
    case "/":
      return 0;
    case "/step2":
      return 1;
    case "/step3":
      return 2;
    case "/step4":
      return 3;
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

  const progressAction = (action: "pause" | "play") => {
    if (action === "pause") setIsPaused(true);
    if (action === "play") setIsPaused(false);
  };

  const navigateToNextScreen = () => {
    switch (pathname) {
      case "/":
        router.push("/(onboarding)/step2");
        break;
      case "/step2":
        router.push("/(onboarding)/step3");
        break;
      case "/step3":
        router.push("/(onboarding)/step4");
        break;
      case "/step4":
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setFinished(true);
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
    if (pathname !== "/step4" && finished) {
      setFinished(false);
    }
  }, [pathname]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.indicator}>
        <LQDOnboardingIndicator
          timer={timer}
          isPaused={isPaused}
          currentStep={currentStep}
          totalSteps={4}
          progressAction={progressAction}
          finished={finished}
        />
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarShowIcon: false,
          swipeEnabled: true,
          tabBarStyle: { display: "none" },
        }}
      >
        <Tab.Screen
          name="step1"
          component={Step1}
          options={{
            title: "Step1",
          }}
        />
        <Tab.Screen
          name="step2"
          component={Step2}
          options={{
            title: "Step2",
          }}
        />
        <Tab.Screen
          name="step3"
          component={Step3}
          options={{
            title: "Step3",
          }}
        />
        <Tab.Screen
          name="step4"
          component={Step4}
          options={{
            title: "Step4",
          }}
        />
      </Tab.Navigator>

      <View style={styles.action}>
        <LQDButton onPress={() => router.replace("/(tabs)")} title="Let's go" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  indicator: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 54,
    paddingHorizontal: 16,
    zIndex: 1,
    justifyContent: "space-between",
  },
  action: {
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === "ios" ? 33 : 16,
    width: Dimensions.get("window").width,
  },
});
