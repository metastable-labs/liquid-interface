import 'react-native-reanimated';

import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// setup viem and api on app start
import '@/init/viem';
import '@/init/api';

import { LQDStackHeader } from '@/components';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ReduxProvider } from '@/components/providers/ReduxProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    QuantaGroteskProBlack: require('../assets/fonts/QuantaGroteskPro/QuantaGroteskPro-Black.otf'),
    QuantaGroteskProBlackItalic: require('../assets/fonts/QuantaGroteskPro/QuantaGroteskPro-BlackItalic.otf'),
    QuantaGroteskProBold: require('../assets/fonts/QuantaGroteskPro/QuantaGroteskPro-Bold.otf'),
    QuantaGroteskProBoldItalic: require('../assets/fonts/QuantaGroteskPro/QuantaGroteskPro-BoldItalic.otf'),
    QuantaGroteskProExtraBold: require('../assets/fonts/QuantaGroteskPro/QuantaGroteskPro-ExtraBold.otf'),
    QuantaGroteskProExtraBoldItalic: require('../assets/fonts/QuantaGroteskPro/QuantaGroteskPro-ExtBdIta.otf'),
    QuantaGroteskProExtraLight: require('../assets/fonts/QuantaGroteskPro/QuantaGroteskPro-ExtraLight.otf'),
    QuantaGroteskProExtraLightItalic: require('../assets/fonts/QuantaGroteskPro/QuantaGroteskPro-ExtLtIta.otf'),
    QuantaGroteskProItalic: require('../assets/fonts/QuantaGroteskPro/QuantaGroteskPro-Italic.otf'),
    QuantaGroteskProLight: require('../assets/fonts/QuantaGroteskPro/QuantaGroteskPro-Light.otf'),
    QuantaGroteskProLightItalic: require('../assets/fonts/QuantaGroteskPro/QuantaGroteskPro-LightItalic.otf'),
    QuantaGroteskProMedium: require('../assets/fonts/QuantaGroteskPro/QuantaGroteskPro-Medium.otf'),
    QuantaGroteskProMediumItalic: require('../assets/fonts/QuantaGroteskPro/QuantaGroteskPro-MediumItalic.otf'),
    QuantaGroteskProRegular: require('../assets/fonts/QuantaGroteskPro/QuantaGroteskPro-Regular.otf'),
    QuantaGroteskProSemiBold: require('../assets/fonts/QuantaGroteskPro/QuantaGroteskPro-SemiBold.otf'),
    QuantaGroteskProSemiBoldItalic: require('../assets/fonts/QuantaGroteskPro/QuantaGroteskPro-SemBdIta.otf'),
    QuantaGroteskProThin: require('../assets/fonts/QuantaGroteskPro/QuantaGroteskPro-Thin.otf'),
    QuantaGroteskProThinItalic: require('../assets/fonts/QuantaGroteskPro/QuantaGroteskPro-ThinItalic.otf'),
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
