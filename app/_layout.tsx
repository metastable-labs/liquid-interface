import 'react-native-reanimated';

import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// setup viem and api on app start
import '@/init/viem';
import '@/init/api';

import { LQDStackHeader } from '@/components';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import { useLoadAppFonts } from '@/hooks/useLoadAppFonts';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useLoadAppFonts();
  const [isPersisted, setPersisted] = useState(false);

  useEffect(() => {
    if (loaded && isPersisted) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isPersisted]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ReduxProvider>
        <ThemeProvider>
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
        </ThemeProvider>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
}
