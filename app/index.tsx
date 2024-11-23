import 'react-native-reanimated';
// EXPO POLIFILLS
import 'fast-text-encoding';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import 'expo-router/entry';

if (__DEV__) {
  require('@/init/reactotron');
}

import FastImage from 'react-native-fast-image';
import { useAuth } from '@/providers/AuthProvider';
import { useEffect } from 'react';
import useSystemFunctions from '@/hooks/useSystemFunctions';

export default function AuthGate() {
  const { router } = useSystemFunctions();
  const { isLoading, session } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      const target = session ? '/(tabs)/home' : '/(onboarding)/step1';

      router.replace(target);
    }
  }, [isLoading, session]);

  return <FastImage style={{ flex: 1 }} source={require('@/assets/images/splash.png')} />;
}
