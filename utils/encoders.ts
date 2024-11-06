import { Address, Hex, encodeFunctionData, erc20Abi } from 'viem';
import { AerodromeConnectorABI, ConnectorPluginABI } from '@/constants/abis';
import { IRouter, Token } from '@/hooks/types';

export function encodePluginExecute(connector: Address, data: Hex) {
  return encodeFunctionData({
    abi: ConnectorPluginABI.abi,
    functionName: 'execute',
    args: [connector, data],
  });
}

export function encodeAddLiquidity({
  tokenA,
  tokenB,
  stable,
  amountAIn,
  amountBIn,
  amountAMin,
  amountBMin,
  balanceTokenRatio,
  to,
  deadline,
}: {
  tokenA: Token;
  tokenB: Token;
  stable: boolean;
  amountAIn: bigint;
  amountBIn: bigint;
  amountAMin: bigint;
  amountBMin: bigint;
  balanceTokenRatio: boolean;
  to: Address;
  deadline: bigint;
}) {
  return encodeFunctionData({
    abi: AerodromeConnectorABI.abi,
    functionName: 'addLiquidity',
    args: [tokenA, tokenB, stable, amountAIn, amountBIn, amountAMin, amountBMin, balanceTokenRatio, to, deadline],
  });
}

export function encodeRemoveLiquidity({
  tokenA,
  tokenB,
  stable,
  liquidity,
  amountAMin,
  amountBMin,
  to,
  deadline,
}: {
  tokenA: Token;
  tokenB: Token;
  stable: boolean;
  liquidity: bigint;
  amountAMin: bigint;
  amountBMin: bigint;
  to: Address;
  deadline: bigint;
}) {
  return encodeFunctionData({
    abi: AerodromeConnectorABI.abi,
    functionName: 'removeLiquidity',
    args: [tokenA, tokenB, stable, liquidity, amountAMin, amountBMin, to, deadline],
  });
}

export function encodeSwap({
  amountIn,
  minReturnAmount,
  routes,
  to,
  deadline,
}: {
  amountIn: bigint;
  minReturnAmount: bigint;
  routes: IRouter.RouteStruct[];
  to: Address;
  deadline: bigint;
}) {
  return encodeFunctionData({
    abi: AerodromeConnectorABI.abi,
    functionName: 'swapExactTokensForTokens',
    args: [amountIn, minReturnAmount, routes, to, deadline],
  });
}

export function encodeStake({ gaugeAddress, amount }: { gaugeAddress: Address; amount: bigint }) {
  return encodeFunctionData({
    abi: AerodromeConnectorABI.abi,
    functionName: 'deposit',
    args: [gaugeAddress, amount],
  });
}
export function encodeApprove({ amount, spender }: { amount: bigint; spender: Address }) {
  return encodeFunctionData({
    abi: erc20Abi,
    functionName: 'approve',
    args: [spender, amount],
  });
}
