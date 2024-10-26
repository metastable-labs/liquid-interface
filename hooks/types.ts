import { Address } from 'viem';

export interface Token {
  address: Address;
  symbol: string;
  decimals: number;
  balance: string;
  isListed: boolean;
  usdPrice: string;
}

interface BasePool {
  address: Address;
  symbol: string;
  decimals: number;
  totalLiquidity: string;
  token0: {
    address: Address;
    reserve: string;
    staked: string;
  };
  token1: {
    address: Address;
    reserve: string;
    staked: string;
  };
  gauge: {
    address: Address;
    liquidity: string;
    isAlive: boolean;
  };
  fees: {
    address: Address;
    token0: string;
    token1: string;
    poolFee: number;
    unstakedFee: number;
  };
  factory: Address;
  emissions: {
    rate: string;
    tokenAddress: Address;
  };
}

export interface V2Pool extends BasePool {
  type: 'v2';
  isStable: boolean; // true for stable pools (-1), false for volatile pools (0)
}

export interface CLPool extends BasePool {
  type: 'cl';
  tickSpacing: number;
  currentTick: number;
  sqrtRatio: string;
}

export type Pool = V2Pool | CLPool;

export type MulticallResult = {
  result: bigint;
  status: 'success' | 'failure';
};
