import 'react-native-reanimated';
// EXPO POLIFILLS
import 'fast-text-encoding';
import 'react-native-get-random-values';
import '@ethersproject/shims';
import 'expo-router/entry';

import { Redirect } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import Step1 from './(onboarding)/step1';

export default function AuthGate() {
  const { isLoading, session } = useAuth();

  if (isLoading) {
    return <Step1 />;
  }

  return session ? <Redirect href="/(tabs)/home" /> : <Redirect href="/(onboarding)/step1" />;
}
