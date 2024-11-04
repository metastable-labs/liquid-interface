import { PrivyProvider } from '@privy-io/expo';
import SignupVerifyEmail from '@/screens/signup/verify-email';

const SignupVerifyEmailScreen = () => (
  <PrivyProvider appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID!} clientId={process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID}>
    <SignupVerifyEmail />
  </PrivyProvider>
);

export default SignupVerifyEmailScreen;
