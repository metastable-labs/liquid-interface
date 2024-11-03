import { PrivyProvider } from '@privy-io/expo';
import { Tag } from '@/screens';

const TagScreen = () => (
  <PrivyProvider appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID!} clientId={process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID}>
    <Tag />
  </PrivyProvider>
);

export default TagScreen;
