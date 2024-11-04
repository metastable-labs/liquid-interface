import { PrivyProvider } from '@privy-io/expo';
import SignupEmail from '@/screens/signup';

const SignupTagScreen = () => (
  <PrivyProvider appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID!} clientId={process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID}>
    <SignupEmail />
  </PrivyProvider>
);

export default SignupTagScreen;
