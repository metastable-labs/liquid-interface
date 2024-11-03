import { PrivyProvider } from '@privy-io/expo';
import VerifyEmail from '@/screens/tag/verify-email';

const VerifyEmailScreen = () => (
  <PrivyProvider appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID!} clientId={process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID}>
    <VerifyEmail />
  </PrivyProvider>
);

export default VerifyEmailScreen;
