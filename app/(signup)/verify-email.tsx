import { PrivyProvider } from '@privy-io/expo';
import { VerifyEmail } from '@/components';
import { useLocalSearchParams } from 'expo-router';

const SignupVerifyEmailScreen = () => {
  const params = useLocalSearchParams();

  const email = params?.email;
  return (
    <PrivyProvider appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID!} clientId={process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID}>
      <VerifyEmail email={email as string} isSignup />
    </PrivyProvider>
  );
};

export default SignupVerifyEmailScreen;
