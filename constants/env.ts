export const isProd = process.env.NODE_ENV === 'production';
export const isDev = !isProd;

export const rpcUrl = process.env.EXPO_PUBLIC_BASE_RPC_URL;
export const bundlerUrl = process.env.EXPO_PUBLIC_BUNDLER_RPC_URL;

export const rpId = 'api.useliquid.xyz';

export const smartAccountInfoKey = 'SMART_ACCOUNT_INFO';

export const privyAppId = process.env.EXPO_PUBLIC_PRIVY_APP_ID as string;
export const privyClientId = process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID;

if (!privyAppId || !privyClientId) {
  throw new Error('Privy App ID and Client ID are required');
}
