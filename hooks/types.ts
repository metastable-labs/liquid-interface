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
  usd_price: string;
  logo_url: string;
};

export type EnhancedFormattedPool = Omit<FormattedPool, EnhancedFormattedPoolType> & {
  token0: Token;
  token1: Token;
  TVL: string;
  volume0: string;
  volume1: string;
  cumulativeVolumeUSD: string;
};

type EnhancedFormattedPoolType = 'token0' | 'token1' | 'TVL' | 'volume0' | 'volume1' | 'cumulativeVolumeUSD';

export type VolumeReturn = { volume0: string; volume1: string; cumulativeVolumeUSD: string };

export interface AddLiquidityParams {
  tokenA: Address;
  tokenB: Address;
  stable: boolean;
  amountAIn: bigint;
  amountBIn: bigint;
  amountAMin: bigint;
  amountBMin: bigint;
  balanceTokenRatio: boolean;
  to: Address;
  deadline: bigint;
}

export interface RemoveLiquidityParams {
  tokenA: Address;
  tokenB: Address;
  stable: boolean;
  liquidity: bigint;
  amountAMin: bigint;
  amountBMin: bigint;
  to: Address;
  deadline: bigint;
}

export interface SwapExactTokensParams {
  amountIn: bigint;
  minReturnAmount: bigint;
  routes: IRouter.RouteStruct[];
  to: Address;
  deadline: bigint;
}

export interface StakeParams {
  gaugeAddress: Address;
  amount: bigint;
}

// types/aerodrome.ts
export namespace IRouter {
  export interface RouteStruct {
    from: Address;
    to: Address;
    stable: boolean;
    factory: Address;
  }

  // Define the full router interface
  export interface IRouter {
    // Swap functions
    swapExactTokensForTokens: (
      amountIn: bigint,
      amountOutMin: bigint,
      routes: RouteStruct[],
      to: Address,
      deadline: bigint
    ) => Promise<bigint[]>;

    getAmountsOut: (amountIn: bigint, routes: RouteStruct[]) => Promise<bigint[]>;

    // Liquidity functions
    addLiquidity: (
      tokenA: Address,
      tokenB: Address,
      stable: boolean,
      amountADesired: bigint,
      amountBDesired: bigint,
      amountAMin: bigint,
      amountBMin: bigint,
      to: Address,
      deadline: bigint
    ) => Promise<[bigint, bigint, bigint]>;

    removeLiquidity: (
      tokenA: Address,
      tokenB: Address,
      stable: boolean,
      liquidity: bigint,
      amountAMin: bigint,
      amountBMin: bigint,
      to: Address,
      deadline: bigint
    ) => Promise<[bigint, bigint]>;

    // Pool related functions
    poolFor: (tokenA: Address, tokenB: Address, stable: boolean, factory: Address) => Promise<Address>;
  }
}

// Export additional types used in the Aerodrome ecosystem
export interface IPool {
  token0: () => Promise<Address>;
  token1: () => Promise<Address>;
  stable: () => Promise<boolean>;
  metadata: () => Promise<{
    dec0: bigint;
    dec1: bigint;
    r0: bigint;
    r1: bigint;
    st: boolean;
    t0: Address;
    t1: Address;
  }>;
  getReserves: () => Promise<{
    reserve0: bigint;
    reserve1: bigint;
    blockTimestampLast: bigint;
  }>;
}

export interface IGauge {
  deposit: (amount: bigint, account: Address) => Promise<void>;
  withdraw: (amount: bigint) => Promise<void>;
  getReward: (account: Address, tokens: Address[]) => Promise<void>;
  balanceOf: (account: Address) => Promise<bigint>;
  earned: (token: Address, account: Address) => Promise<bigint>;
  stakingToken: () => Promise<Address>;
}

// Additional helper types
export interface PoolReserves {
  reserve0: bigint;
  reserve1: bigint;
  blockTimestampLast: bigint;
}

export interface PoolMetadata {
  dec0: bigint;
  dec1: bigint;
  r0: bigint;
  r1: bigint;
  st: boolean;
  t0: Address;
  t1: Address;
}

// Example usage of types:
export const createRoute = (from: Address, to: Address, stable: boolean = false, factory: Address): IRouter.RouteStruct => ({
  from,
  to,
  stable,
  factory,
});
