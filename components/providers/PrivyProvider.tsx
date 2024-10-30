import { PropsWithChildren } from 'react';
import { PrivyProvider as PrivyProviderBase } from '@privy-io/expo';

import { privyAppId, privyClientId } from '@/constants/env';

export function PrivyProvider({ children }: PropsWithChildren) {
  if (!privyAppId?.length || !privyClientId?.length) {
    throw new Error('EXPO_PUBLIC_PRIVY_APP_ID or EXPO_PUBLIC_PRIVY_CLIENT_ID are not set');
  }

  return (
    <PrivyProviderBase appId={privyAppId} clientId={privyClientId}>
      {children}
    </PrivyProviderBase>
  );
}
