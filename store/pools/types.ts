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
  emissions: {
    rate: string;
    tokenAddress: Address;
  };
  factory: Address;
  fees: {
    address: Address;
    poolFee: number;
    token0: string;
    token1: string;
    unstakedFee: number;
  };
  gauge: {
    address: Address;
    isAlive: boolean;
    liquidity: string;
  };
  isStable: boolean;
  symbol: string;
  token0: {
    address: Address;
    logoUrl: string;
    price: string;
    reserve: string;
    staked: string;
  };
  token1: {
    address: Address;
    logoUrl: string;
    price: string;
    reserve: string;
    staked: string;
  };
  totalLiquidity: string;
  tvl: string;
  type: string;
  volume: {
    token0: string;
    token1: string;
    usd: string;
  };
};
