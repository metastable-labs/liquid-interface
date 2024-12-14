import { Tabs } from 'expo-router';
import { Platform, StatusBar as RNStatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { LQDActionCard, LQDBottomSheet, LQDFlatlist, LQDNavigation } from '@/components';
import Header from '@/screens/home/header';
import { useState } from 'react';
import { sortList } from '@/screens/discover/dummy';
import useSystemFunctions from '@/hooks/useSystemFunctions';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [show, setShow] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const { router } = useSystemFunctions();

  const navigate = () => {
    router.push('/(portfolio)');
  };

  const openModal = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container} />
      <LQDBottomSheet show={show} title="Sort by" variant="primary" onClose={openModal}>
        <View style={styles.modalContainerStyle}>
          {sortList.map((action, index) => (
            <LQDActionCard
              key={index}
              variant="sort"
              selected={selectedAction === action.id}
              actions={action}
              onSelect={() => setSelectedAction(action.id)}
            />
          ))}
        </View>
      </LQDBottomSheet>

      <Tabs
        tabBar={(props) => <LQDNavigation {...props} />}
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: true,
          header: () => <Header amount={3333} actionRight={navigate} actionLeft={openModal} />,
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
  protocalContainerStyle: { gap: 20, paddingBottom: 50 },
  modalContainerStyle: { gap: 20, paddingBottom: 50 },
});
