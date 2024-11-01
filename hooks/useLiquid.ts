import { useCallback } from 'react';
import { PublicClient, Address, formatUnits } from 'viem';
import { AddLiquidityQuoteParams, AddLiquidityQuoteResult } from './types';
import { AerodromeConnectorABI } from '@/constants/abis';

export function usePool(publicClient: PublicClient) {
  const getDepositQuote = async (
    connectorAddress: Address,
    { tokenA, tokenB, stable, amountA, amountB, decimalsA, decimalsB, balanceTokenRatio = true }: AddLiquidityQuoteParams
  ): Promise<AddLiquidityQuoteResult> => {
    try {
      const result = await publicClient.readContract({
        address: connectorAddress,
        abi: AerodromeConnectorABI.abi,
        functionName: 'quoteDepositLiquidity',
        args: [tokenA, tokenB, stable, amountA, amountB, balanceTokenRatio],
      });

      return {
        // Raw Values
        amountA: result.amountA,
        amountB: result.amountB,
        // Formatted Values
        formattedAmountA: formatUnits(result.amountA, decimalsA),
        formattedAmountB: formatUnits(result.amountB, decimalsB),
      };
    } catch (error) {
      console.error('Failed to get deposit quote:', error);
      throw error;
    }
  };

  return useCallback(() => {}, []);
}
