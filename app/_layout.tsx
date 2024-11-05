import 'react-native-reanimated';

import { Stack } from 'expo-router';

// setup viem and api on app start
import '@/init/viem';
import '@/init/api';

import { AllProviders } from '@/providers';
import { LQDStackHeader } from '@/components';
import { useOnMount } from '@/hooks/useOnMount';
import { usePoolActions } from '@/store/pools/actions';

export default function RootLayout() {
  return (
    <AllProviders>
      <RootStack />
    </AllProviders>
  );
}

function RootStack() {
  const { getPools } = usePoolActions();

  useOnMount(function loadData() {
    getPools();
  });

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" options={{ title: 'AuthGate' }} />

      {/* Unprotected routes */}
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(login)" />
      <Stack.Screen name="(signup)" />
      <Stack.Screen name="setup" />

      {/* Protected routes */}
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="(liquidity-actions)"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="liquidity-management"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="withdraw"
        options={{
          header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 80 }} hasTitle />,
          headerTitle: 'Withdraw',
          headerShown: true,
        }}
      />

      {/* Common routes */}
      <Stack.Screen name="+not-found" options={{ headerShown: true }} />
    </Stack>
  );
}
