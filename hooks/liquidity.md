# Aerodrome Liquidity Hooks Documentation

## Overview
The `useLiquidity` hook provides methods for interacting with Aerodrome liquidity pools, including adding/removing liquidity, swapping tokens, and staking LP tokens.

## Installation & Setup
```typescript
import { useLiquidity } from '@/hooks/useLiquidity';
import { usePublicClient } from 'wagmi';

function YourComponent() {
  const publicClient = usePublicClient();
  const { addLiquidity, removeLiquidity, swap, stake } = useLiquidity(
    publicClient, 
    account // your wallet address
  );
}
```

## Core Methods

### 1. Adding Liquidity
Add liquidity to an Aerodrome pool with optional pre-swap functionality.

```typescript
// Basic liquidity addition
const addLiquidityExample = async () => {
  await addLiquidity({
    tokenA: {
      address: '0x...', // token A address
      decimals: 18
    },
    tokenB: {
      address: '0x...', // token B address
      decimals: 18
    },
    stable: true, // true for stable pools, false for volatile
    amountAIn: '1.0', // amount of token A to add
    amountBIn: '1.0', // amount of token B to add
    to: account, // recipient address
  });
};

// Adding liquidity with a pre-swap
const addLiquidityWithSwapExample = async () => {
  await addLiquidity({
    // Regular liquidity parameters
    tokenA: {
      address: '0x...',
      decimals: 18
    },
    tokenB: {
      address: '0x...',
      decimals: 18
    },
    stable: true,
    amountAIn: '1.0',
    amountBIn: '1.0',
    to: account,
    
    // Pre-swap configuration
    preSwap: {
      enabled: true,
      params: {
        tokenA: {
          address: '0x...', // token to swap from
          decimals: 6
        },
        tokenB: {
          address: '0x...', // token to swap to
          decimals: 18
        },
        amountIn: '1000', // amount to swap
        minReturnAmount: '0.95', // minimum expected return
        stable: true,
        to: account
      }
    }
  });
};
```

### 2. Removing Liquidity
Remove liquidity from an Aerodrome pool.

```typescript
const removeLiquidityExample = async () => {
  await removeLiquidity({
    tokenA: {
      address: '0x...',
      decimals: 18
    },
    tokenB: {
      address: '0x...',
      decimals: 18
    },
    stable: true,
    liquidity: '1.0', // amount of LP tokens to remove
    amountAMin: '0.95', // minimum amount of token A to receive
    amountBMin: '0.95', // minimum amount of token B to receive
    to: account
  });
};
```

### 3. Swapping Tokens
Execute a token swap on Aerodrome.

```typescript
const swapExample = async () => {
  await swap({
    tokenA: {
      address: '0x...',
      decimals: 18
    },
    tokenB: {
      address: '0x...',
      decimals: 18
    },
    stable: true,
    amountIn: '1.0',
    minReturnAmount: '0.95',
    to: account
  });
};
```

### 4. Staking LP Tokens
Stake LP tokens in an Aerodrome gauge.

```typescript
const stakeExample = async () => {
  await stake({
    gauge: {
      address: '0x...', // gauge address
      decimals: 18
    },
    amount: '1.0' // amount of LP tokens to stake
  });
};
```

## Transaction Configuration
All methods accept an optional transaction configuration object:

```typescript
const txConfig = {
  waitForReceipt: true, // whether to wait for transaction confirmation
};

// Example usage
await addLiquidity(params, txConfig);
```

## Type Definitions

### Token Interface
```typescript
interface Token {
  address: Address;
  decimals: number;
}
```

### Add Liquidity Parameters
```typescript
interface AddLiquidityParams {
  tokenA: Token;
  tokenB: Token;
  stable: boolean;
  amountAIn: string;
  amountBIn: string;
  to: Address;
}

interface AddLiquidityWithSwapParams extends AddLiquidityParams {
  preSwap?: {
    enabled: boolean;
    params: {
      tokenA: Token;
      tokenB: Token;
      amountIn: string;
      minReturnAmount: string;
      stable: boolean;
      to: Address;
    };
  };
}
```

### Remove Liquidity Parameters
```typescript
interface RemoveLiquidityParams {
  tokenA: Token;
  tokenB: Token;
  stable: boolean;
  liquidity: string;
  amountAMin: string;
  amountBMin: string;
  to: Address;
}
```

### Swap Parameters
```typescript
interface SwapExactTokensParams {
  tokenA: Token;
  tokenB: Token;
  stable: boolean;
  amountIn: string;
  minReturnAmount: string;
  to: Address;
}
```

### Stake Parameters
```typescript
interface StakeParams {
  gauge: {
    address: Address;
    decimals: number;
  };
  amount: string;
}
```

## Error Handling
```typescript
try {
  await addLiquidity(params);
} catch (error) {
  if (error instanceof Error) {
    console.error('Transaction failed:', error.message);
  }
}
```

## Notes
- All amount inputs are in human-readable format (e.g., "1.0" for 1 token)
- Decimals are handled automatically based on token configuration
- Transactions are automatically batched for efficiency
- Approvals are handled automatically
- Default deadline is set to 1 hour from execution