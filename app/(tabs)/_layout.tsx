import { Tabs } from 'expo-router';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LQDNavigation, LQDSearch } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { appState } = useSystemFunctions();

  return (
    <>
      {!appState.hideSearch && (
        <View style={styles.shortcut}>
          <LQDSearch />
        </View>
      )}

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}
        tabBar={(props) => <LQDNavigation {...props} />}
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 54,
    zIndex: 10,
    backgroundColor: '#fff',
  },
});
