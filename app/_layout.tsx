import 'react-native-reanimated';

import { Stack } from 'expo-router';

// setup viem and api on app start
import '@/init/useViem';
import '@/init/client';
import '@/init/api';

import { AllProviders } from '@/providers';
import { LQDStackHeader, LQToast } from '@/components';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <AllProviders>
      <RootStack />
      <LQToast />
    </AllProviders>
  );
}

function RootStack() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" options={{ title: 'AuthGate' }} />

      {/* Unprotected routes */}
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(login)/index" />
      <Stack.Screen name="(login)/verify-email" />
      <Stack.Screen name="(signup)/index" />
      <Stack.Screen name="(signup)/verify-email" />
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
          header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 60 }} hasTitle />,
          headerTitle: 'Withdraw',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="(settings)/index"
        options={{
          header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 60 }} hasTitle />,
          headerTitle: 'Settings',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="(settings)/legal-privacy"
        options={{
          header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 60 }} hasTitle />,
          headerTitle: 'Legal & Privacy',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="(settings)/support"
        options={{
          header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 60 }} hasTitle />,
          headerTitle: 'Support',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="create-strategy"
        options={{
          header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 60 }} hasTitle />,
          headerTitle: 'Create Strategy',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="new-action-strategy"
        options={{
          header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 60 }} hasTitle rightIcon="bulb" leftIcon="close" />,
          headerTitle: 'New Action',
          headerShown: true,
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom',
        }}
      />

      <Stack.Screen
        name="preview-strategy"
        options={{
          header: (props) => <LQDStackHeader {...props} style={{ paddingTop: 60 }} hasTitle rightIcon="bulb" />,
          headerTitle: 'Preview and publish',
          headerShown: true,
        }}
      />

      {/* Common routes */}
      <Stack.Screen name="+not-found" options={{ headerShown: true }} />
    </Stack>
  );
}
