import { Tabs } from 'expo-router';
import { Platform, StatusBar as RNStatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { LQDBottomSheet, LQDNavigation } from '@/components';
import Header from '@/screens/home/header';
import { useState } from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [show, setShow] = useState(false);

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container} />
      {/* fix this header showing on all screens */}

      <LQDBottomSheet show={show} title="Sort by" variant="primary" onClose={() => setShow((prev) => !prev)}></LQDBottomSheet>

      <Tabs
        tabBar={(props) => <LQDNavigation {...props} />}
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: true,
          header: () => <Header amount={3333} action={() => setShow((prev) => !prev)} />,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />,
          }}
        />

        <Tabs.Screen
          name="discover"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />,
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 48,
    backgroundColor: '#fff',
  },
});
