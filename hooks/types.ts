import { Address } from 'viem';

// Raw types (as returned by the contract)
export type RawPool = {
  lp: Address;
  symbol: string;
  decimals: number;
  liquidity: bigint;
  type: number;
  token0: Address;
  reserve0: bigint;
  staked0: bigint;
  token1: Address;
  reserve1: bigint;
  staked1: bigint;
  gauge: Address;
  gauge_liquidity: bigint;
  gauge_alive: boolean;
  fee: Address;
  bribe: Address;
  factory: Address;
  emissions: bigint;
  emissions_token: Address;
  pool_fee: bigint;
  token0_fees: bigint;
  token1_fees: bigint;
};

export type RawPosition = {
  id: bigint;
  lp: Address;
  liquidity: bigint;
  staked: bigint;
  amount0: bigint;
  amount1: bigint;
  staked0: bigint;
  staked1: bigint;
  unstaked_earned0: bigint;
  unstaked_earned1: bigint;
  emissions_earned: bigint;
};

// Formatted types (after processing)
export type FormattedPool = {
  lp: string;
  symbol: string;
  decimals: number;
  liquidity: string;
  type: 'CL' | 'V2';
  stable: boolean;
  token0: string;
  reserve0: string;
  staked0: string;
  token1: string;
  reserve1: string;
  staked1: string;
  gauge: string;
  gauge_liquidity: string;
  gauge_alive: boolean;
  fee: string;
  bribe: string;
  factory: string;
  emissions: string;
  emissions_token: string;
  pool_fee: string;
  token0_fees: string;
  token1_fees: string;
};

export type FormattedPosition = {
  id: string;
  lp: string;
  liquidity: string;
  staked: string;
  amount0: string;
  amount1: string;
  staked0: string;
  staked1: string;
  unstaked_earned0: string;
  unstaked_earned1: string;
  emissions_earned: string;
};

export type Token = {
  token_address: Address;
  symbol: string;
  decimals: number;
  account_balance: string;
  listed: boolean;
};
