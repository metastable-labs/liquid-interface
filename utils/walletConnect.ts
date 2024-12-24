import { IProviderMetadata } from '@walletconnect/modal-react-native';

const providerMetadata: IProviderMetadata = {
  name: 'Liquid',
  description: 'Liquid Wallet',
  url: 'https://useliquid.xyz',
  icons: ['https://res.cloudinary.com/djzeufu4j/image/upload/v1734991182/liquid_logo_ico.ico'],
  redirect: {
    native: 'myliquidapp://',
  },
};

const sessionParams = {
  namespaces: {
    eip155: {
      methods: ['eth_sendTransaction', 'personal_sign'],
      chains: ['eip155:1', 'eip155:8453'],
      events: ['chainChanged', 'accountsChanged'],
      rpcMap: {},
    },
  },
};

export default {
  ENV_PROJECT_ID: '',
  providerMetadata,
  sessionParams,
};
