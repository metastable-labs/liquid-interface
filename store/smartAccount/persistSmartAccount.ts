import * as SecureStore from 'expo-secure-store';
import { SmartAccountPersistedInfo } from '@/init/types';
import { smartAccountInfoKey } from '@/constants/env';

import { SmartAccountInfoNotFoundError } from './errors';

export async function persistSmartAccountInfo(smartAccountInfo: SmartAccountPersistedInfo) {
  try {
    if (!smartAccountInfo) {
      throw new SmartAccountInfoNotFoundError();
    }

    await SecureStore.setItemAsync(smartAccountInfoKey, JSON.stringify(smartAccountInfo));
  } catch (error) {
    console.log('Error persisting smart account info', error);
    throw error;
  }
}

export async function getPersistedSmartAccountInfo(): Promise<SmartAccountPersistedInfo> {
  try {
    const smartAccountInfoJSON = await SecureStore.getItemAsync(smartAccountInfoKey);

    if (!smartAccountInfoJSON) {
      throw new SmartAccountInfoNotFoundError();
    }

    return JSON.parse(smartAccountInfoJSON);
  } catch (error) {
    console.log('Error getting persisted smart account info', error);
    throw error;
  }
}

export async function clearPersistedSmartAccountInfo() {
  try {
    await SecureStore.deleteItemAsync(smartAccountInfoKey);
  } catch (error) {
    console.log('Error clearing persisted smart account info', error);
    throw error;
  }
}
