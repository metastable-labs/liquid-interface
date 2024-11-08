import { Address, Hex } from 'viem';

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

// export type Token = {
//   token_address: Address;
//   symbol: string;
//   decimals: number;
//   account_balance: string;
//   listed: boolean;
//   usd_price: string;
//   logo_url: string;
// };

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

export interface AddLiquidityQuoteParams {
  tokenA: Address;
  tokenB: Address;
  stable: boolean;
  amountA: bigint;
  amountB: bigint;
  balanceTokenRatio?: boolean;
  decimalsA: number;
  decimalsB: number;
}

export interface AddLiquidityQuoteResult {
  // Raw Values
  amountAOut: bigint;
  amountBOut: bigint;
  // Formatted Values
  formattedAmountAOut: string;
  formattedAmountBOut: string;
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

export interface TransactionConfig {
  hash: Hex;
  waitForReceipt?: boolean;
}

export type LPSugarToken = {
  account_balance: bigint;
  decimals: number;
  listed: boolean;
  symbol: string;
  token_address: Address;
};

export type LPSugarTokenResponse = {
  account_balance: bigint;
  decimals: number;
  listed: boolean;
  symbol: string;
  token_address: Address;
}[];
