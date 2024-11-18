// Privy polyfills
import 'fast-text-encoding';
import 'react-native-get-random-values';
import '@ethersproject/shims';

import 'react-native-reanimated';
import 'expo-router/entry';
import { Redirect } from 'expo-router';

import { useAuth } from '@/providers/AuthProvider';

import Step1 from './(onboarding)/step1';

if (__DEV__) {
  require('@/init/reactotron');
}

export default function AuthGate() {
  const { isLoading, session } = useAuth();

  if (isLoading) {
    return <Step1 />;
  }

  return session ? <Redirect href="/(tabs)/home" /> : <Redirect href="/(onboarding)/step1" />;
}
