import { PropsWithChildren, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';

import { useLoadAppFonts } from '@/hooks/useLoadAppFonts';
import { PrivyProvider } from '@privy-io/expo';
import { privyAppId, privyClientId } from '@/constants/env';

import { ReduxProvider } from './ReduxProvider';
import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from './AuthProvider';
import { TanstackProvider } from './TanstackProvider';
import { WalletConnectProvider } from './WalletConnectProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ fade: true, duration: 1000 });

export function AllProviders({ children }: PropsWithChildren) {
  const [allFontsLoaded] = useLoadAppFonts();

  useEffect(
    function liftSplashScreen() {
      if (allFontsLoaded) {
        SplashScreen.hideAsync();
      }
    },
    [allFontsLoaded]
  );

  useEffect(() => {
    const subscription = Linking.addEventListener('url', (event) => {
      const url = event.url;
      console.log('Deep link received:', url);
      // Handle the deep link
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (!allFontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <PrivyProvider appId={privyAppId} clientId={privyClientId}>
        <TanstackProvider>
          <ReduxProvider>
            <ThemeProvider>
              <AuthProvider>
                <WalletConnectProvider>{children}</WalletConnectProvider>
              </AuthProvider>
            </ThemeProvider>
          </ReduxProvider>
        </TanstackProvider>
      </PrivyProvider>
    </GestureHandlerRootView>
  );
}
