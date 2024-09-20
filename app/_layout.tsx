import { useEffect, useState } from 'react';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { persistor, store } from '@/store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
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
    <ReduxProvider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={() => setPersisted(true)}
      >
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen
              name="(onboarding)"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
