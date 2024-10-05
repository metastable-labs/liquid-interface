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
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    ClashDisplayBold: require('../assets/fonts/ClashDisplay/ClashDisplay-Bold.otf'),
    ClashDisplayRegular: require('../assets/fonts/ClashDisplay/ClashDisplay-Regular.otf'),
    ClashDisplayMedium: require('../assets/fonts/ClashDisplay/ClashDisplay-Medium.otf'),
    ClashDisplayLight: require('../assets/fonts/ClashDisplay/ClashDisplay-Light.otf'),
    ClashDisplayExtraLight: require('../assets/fonts/ClashDisplay/ClashDisplay-Extralight.otf'),
    ClashDisplaySemibold: require('../assets/fonts/ClashDisplay/ClashDisplay-Semibold.otf'),
    AeonikBold: require('../assets/fonts/Aeonik/Aeonik-Bold.otf'),
    AeonikRegular: require('../assets/fonts/Aeonik/Aeonik-Regular.otf'),
    AeonikMedium: require('../assets/fonts/Aeonik/Aeonik-Medium.otf'),
    AeonikLight: require('../assets/fonts/Aeonik/Aeonik-Light.otf'),
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
    <GestureHandlerRootView>
      <ReduxProvider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
          onBeforeLift={() => setPersisted(true)}
        >
          <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(onboarding)" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="setup" />
              <Stack.Screen
                name="liquidity-management"
                options={{
                  presentation: 'modal',
                  animation: 'slide_from_bottom',
                }}
              />
              <Stack.Screen name="+not-found" options={{ headerShown: true }} />
            </Stack>
          </ThemeProvider>
        </PersistGate>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
}
