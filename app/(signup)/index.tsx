import { PrivyProvider } from '@privy-io/expo';
import { EnterEmail } from '@/components';

const SignupTagScreen = () => (
  <PrivyProvider appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID!} clientId={process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID}>
    <EnterEmail isSignup />
  </PrivyProvider>
);

export default SignupTagScreen;
