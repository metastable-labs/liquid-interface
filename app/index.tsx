import 'react-native-reanimated';

import { Redirect } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';

export default function AuthGate() {
  const { isLoading, session } = useAuth();

  if (isLoading) {
    // TODO: implement proper loading state
    return null;
  }

  return session ? <Redirect href="/(tabs)/home" /> : <Redirect href="/(onboarding)/step1" />;
}
