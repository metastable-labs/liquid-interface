import { PropsWithChildren } from 'react';
import { Provider as ReduxProviderBase } from 'react-redux';
import { PersistGate, PersistGateProps } from 'redux-persist/integration/react';

import { store, persistor } from '@/store';

type ReduxProviderProps = PropsWithChildren & Pick<PersistGateProps, 'onBeforeLift'>;

export function ReduxProvider({ children, onBeforeLift }: ReduxProviderProps) {
  return (
    <ReduxProviderBase store={store}>
      <PersistGate loading={null} persistor={persistor} onBeforeLift={onBeforeLift}>
        {children}
      </PersistGate>
    </ReduxProviderBase>
  );
}
