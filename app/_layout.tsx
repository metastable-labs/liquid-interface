import 'react-native-reanimated';

import { useEffect } from 'react';
import { Stack } from 'expo-router';

// setup viem and api on app start
import '@/init/viem';
import '@/init/api';

import { AllProviders } from '@/components/providers';
import { LQDStackHeader } from '@/components';
import { usePoolActions } from '@/store/pools/actions';

export default function RootLayout() {
  return (
    <AllProviders>
      <Routes />
    </AllProviders>
  );
}

const Routes = () => {
  const { getPools } = usePoolActions();

  useEffect(function loadData() {
    getPools();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="(liquidity-actions)"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen name="setup" />
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
      <Stack.Screen name="+not-found" options={{ headerShown: true }} />
    </Stack>
  );
};
