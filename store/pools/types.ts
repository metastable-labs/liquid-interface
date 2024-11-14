import { Address } from 'viem';

export type PoolResponse = {
  data: Pool[];
  pagination: {
    limit: number;
    page: number;
    hasMore: boolean;
  };
};

export const defaultPoolResponse = {
  data: [],
  pagination: {
    limit: 10,
    page: 0,
    hasMore: true,
  },
};

export type Pool = {
  address: Address;
  decimals: number;
  symbol: string;
  apr: string;
  tvl: string;
  totalVolumeUSD: string;
  totalFeesUSD: string;
  txCount: number | string;
  isStable: boolean;
  factory: Address;
  token0: {
    address: Address;
    logoUrl: string;
    price: string;
    reserve: string;
    volume: string;
  };
  token1: {
    address: Address;
    logoUrl: string;
    price: string;
    reserve: string;
    volume: string;
  };
};
