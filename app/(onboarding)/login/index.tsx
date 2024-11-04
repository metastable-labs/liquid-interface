import { PrivyProvider } from '@privy-io/expo';
import LoginEmail from '@/screens/login';

const LoginTagScreen = () => (
  <PrivyProvider appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID!} clientId={process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID}>
    <LoginEmail />
  </PrivyProvider>
);

export default LoginTagScreen;
