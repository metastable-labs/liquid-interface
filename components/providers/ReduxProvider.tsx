import { PropsWithChildren } from 'react';
import { Provider as ReduxProviderBase } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@/store';

export function ReduxProvider({ children }: PropsWithChildren) {
  return (
    <ReduxProviderBase store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        // TODO: implement onBeforeLift
        // onBeforeLift={() => setPersisted(true)}
      >
        {children}
      </PersistGate>
    </ReduxProviderBase>
  );
}
