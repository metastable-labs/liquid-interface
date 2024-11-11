import { Address } from 'viem';

export type TokenResponse = {
  data: TokenItem[];
  pagination: {
    limit: number;
    page: number;
    hasMore: boolean;
  };
};

export type TokenItem = {
  address: Address;
  symbol: string;
  decimals: number;
  balance: string;
  isListed: boolean;
  usdPrice: string;
  logoUrl: string;
  lastUpdated: string;
  createdAt: string;
};

export const defaultToken: TokenResponse = {
  data: [
    {
      address: '0x',
      symbol: '',
      decimals: 0,
      balance: '0',
      isListed: false,
      usdPrice: '0',
      logoUrl: '',
      lastUpdated: '',
      createdAt: '',
    },
  ],
  pagination: {
    limit: 10,
    page: 0,
    hasMore: true,
  },
};
