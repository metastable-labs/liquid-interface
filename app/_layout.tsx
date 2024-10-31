import 'react-native-reanimated';

import { Stack } from 'expo-router';

// setup viem and api on app start
import '@/init/viem';
import '@/init/api';

import { AllProviders } from '@/components/providers';
import { LQDStackHeader } from '@/components';

export default function RootLayout() {
  return (
    <AllProviders>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="(onboarding)">
        {/* Unprotected routes */}
        <Stack.Screen name="(onboarding)" />

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
    </AllProviders>
  );
}
