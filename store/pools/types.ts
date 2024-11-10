import { Address } from 'viem';

export type PoolResponse = {
  data: Pool[];
  pagination: {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
  };
};

export const defaultPoolResponse = {
  data: [],
  pagination: {
    limit: 10,
    page: 0,
    total: 0,
    totalPages: 1,
  },
};

export type Pool = {
  address: Address;
  decimals: number;
  symbol: string;
  apr: string;
  tvl: string;
  totalVolumeUSD: string;
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
