import { PrivyProvider } from '@privy-io/expo';
import LoginVerifyEmail from '@/screens/login/verify-email';

const LoginVerifyEmailScreen = () => (
  <PrivyProvider appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID!} clientId={process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID}>
    <LoginVerifyEmail />
  </PrivyProvider>
);

export default LoginVerifyEmailScreen;
