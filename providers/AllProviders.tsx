import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useLoadAppFonts } from '@/hooks/useLoadAppFonts';
import { PrivyProvider } from '@privy-io/expo';
import { privyAppId, privyClientId } from '@/constants/env';

import { ReduxProvider } from './ReduxProvider';
import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from './AuthProvider';
import { TanstackProvider } from './TanstackProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export function AllProviders({ children }: PropsWithChildren) {
  const [allFontsLoaded] = useLoadAppFonts();
  const [isReduxStorePersisted, setReduxStorePersisted] = useState(false);

  useEffect(
    function liftSplashScreen() {
      if (allFontsLoaded && isReduxStorePersisted) {
        SplashScreen.hideAsync();
      }
    },
    [allFontsLoaded, isReduxStorePersisted]
  );

  const handleReduxStorePersisted = useCallback(() => {
    setReduxStorePersisted(true);
  }, [setReduxStorePersisted]);

  if (!allFontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <PrivyProvider appId={privyAppId} clientId={privyClientId}>
        <TanstackProvider>
          <ReduxProvider onBeforeLift={handleReduxStorePersisted}>
            <ThemeProvider>
              <AuthProvider>{children}</AuthProvider>
            </ThemeProvider>
          </ReduxProvider>
        </TanstackProvider>
      </PrivyProvider>
    </GestureHandlerRootView>
  );
}
