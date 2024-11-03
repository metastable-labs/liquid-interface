import { Tabs } from 'expo-router';
import { Platform, StatusBar as RNStatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { LQDNavigation, LQDSearch } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { appState } = useSystemFunctions();

  return (
    <>
      <StatusBar style="inverted" />
      {!appState.hideSearch && (
        <View style={styles.shortcut}>
          <LQDSearch />
        </View>
      )}

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
  shortcut: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 21,
    paddingBottom: 10,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 54,
    zIndex: 10,
    backgroundColor: '#fff',
  },
});
