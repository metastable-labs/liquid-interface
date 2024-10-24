export const isProd = process.env.NODE_ENV === 'production';
export const isDev = !isProd;

export const rpcUrl = process.env.EXPO_PUBLIC_BASE_RPC_URL;
export const bundlerUrl = process.env.EXPO_PUBLIC_BUNDLER_RPC_URL;
