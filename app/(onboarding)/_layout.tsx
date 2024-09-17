import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Step1 from ".";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";

const Tab = createMaterialTopTabNavigator();

export default function OnboardingTabLayout() {
  return (
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
  );
}
