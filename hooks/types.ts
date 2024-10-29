import { Address } from 'viem';

export interface Token {
  address: Address;
  symbol: string;
  decimals: number;
  balance: string;
  isListed: boolean;
  usdPrice: string;
  logoUrl: string;
}

export interface BasePool {
  address: Address;
  symbol: string;
  decimals: number;
  totalLiquidity: string;
  token0: {
    address: Address;
    reserve: string;
    staked: string;
    logoUrl: string;
  };
  token1: {
    address: Address;
    reserve: string;
    staked: string;
    logoUrl: string;
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
  volume: {
    token0: string;
    token1: string;
    usd: string;
  };
  factory: Address;
  emissions: {
    rate: string;
    tokenAddress: Address;
  };
  type: string;
  isStable: boolean;
  tvl: string;
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

// Position token info
interface PositionToken {
  address: Address;
  balance: string;
  stakedBalance: string;
}

// Fee info for positions
interface PositionFees {
  token0: string;
  token1: string;
}

// Reward info
interface Reward {
  address: Address;
  earned: string;
}
// Position interface
export interface Position {
  id: string; // 0 for v2 pools
  poolAddress: Address;
  balance: string; // LP token balance
  stakedBalance: string; // Staked LP token balance
  token0: PositionToken; // Token0 info
  token1: PositionToken; // Token1 info
  fees: PositionFees; // Unclaimed fees
  reward: Reward; // Reward token info and unclaimed amount
}

export type MulticallResult = {
  result: bigint;
  status: 'success' | 'failure';
};
