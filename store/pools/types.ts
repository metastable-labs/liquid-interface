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
  apr: number;
  tvl: number;
  totalVolumeUSD: number;
  totalFeesUSD: number;
  poolFee: number;
  txCount: number;
  isStable: boolean;
  factory: Address;
  quoteTokenPriceBaseToken: number;
  baseTokenPriceQuoteToken: number;
  token0: {
    address: Address;
    logoUrl: string;
    price: number;
    reserve: number;
    reserveUSD: number;
    volume: string;
  };
  token1: {
    address: Address;
    logoUrl: string;
    price: number;
    reserve: number;
    reserveUSD: number;
    volume: string;
  };
  historicalVolumeUSD: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
};
