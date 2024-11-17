export const isProd = process.env.NODE_ENV === 'production';
export const isDev = !isProd;

export const rpcUrl = process.env.EXPO_PUBLIC_BASE_RPC_URL;
export const bundlerUrl = process.env.EXPO_PUBLIC_BUNDLER_RPC_URL;
export const pimilcoApiKey = process.env.EXPO_PUBLIC_PIMILCO_API_KEY;

export const pimilcoRPCURL = `https://api.pimlico.io/v2/8453/rpc?apikey=${pimilcoApiKey}`;

export const rpId = 'api.useliquid.xyz';

export const smartAccountInfoKey = 'SMART_ACCOUNT_INFO';

export const privyAppId = process.env.EXPO_PUBLIC_PRIVY_APP_ID as string;
export const privyClientId = process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID as string;

if (!privyAppId || !privyClientId) {
  throw new Error('EXPO_PUBLIC_PRIVY_APP_ID and EXPO_PUBLIC_PRIVY_CLIENT_ID are required');
}

export const apiUrl = process.env.EXPO_PUBLIC_API_URL as string;
export const apiKey = process.env.EXPO_PUBLIC_API_KEY as string;

if (!apiUrl || !apiKey) {
  throw new Error('EXPO_PUBLIC_API_URL and EXPO_PUBLIC_API_KEY are required');
}
