import { Address } from 'viem';

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
