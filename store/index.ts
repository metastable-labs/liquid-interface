import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import userReducer from './user';
import appReducer from './app';
import smartAccountReducer from './smartAccount';
import poolReducer from './pools';
import accountReducer from './account';

export interface CallbackProps {
  onSuccess?: Function;
  onError?: Function;
}

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
  smartAccount: smartAccountReducer,
  pools: poolReducer,
  account: accountReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'pools', 'smartAccount', 'account'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {user: UserState}
export type AppDispatch = typeof store.dispatch;
// To create the persistor
export const persistor = persistStore(store);
