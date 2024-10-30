import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useLoadAppFonts } from '@/hooks/useLoadAppFonts';

import { ReduxProvider } from './ReduxProvider';
import { ThemeProvider } from './ThemeProvider';
import { PrivyProvider } from './PrivyProvider';

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
      <ReduxProvider onBeforeLift={handleReduxStorePersisted}>
        <ThemeProvider>
          <PrivyProvider>{children}</PrivyProvider>
        </ThemeProvider>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
}
