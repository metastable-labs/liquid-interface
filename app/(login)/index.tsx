import { PrivyProvider } from '@privy-io/expo';
import { EnterEmail } from '@/components';

const LoginTagScreen = () => (
  <PrivyProvider appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID!} clientId={process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID}>
    <EnterEmail />
  </PrivyProvider>
);

export default LoginTagScreen;
