import { Tabs } from 'expo-router';
import { Platform, StatusBar as RNStatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { LQDNavigation } from '@/components';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container} />

      <Tabs
        tabBar={(props) => <LQDNavigation {...props} />}
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />,
          }}
        />

        <Tabs.Screen
          name="holdings"
          options={{
            title: 'Holdings',
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
