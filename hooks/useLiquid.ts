import { useCallback } from 'react';
import { Address, parseUnits, erc20Abi, Hex, PublicClient } from 'viem';
import { encodePluginExecute, encodeAddLiquidity, encodeRemoveLiquidity, encodeSwap, encodeStake, encodeApprove } from '@/utils/encoders';
import { AERODROME_CONNECTOR, AERODROME_FACTORY_ADDRESS, CONNECTOR_PLUGIN } from '@/constants/addresses';
import {
  AddLiquidityParams,
  AddLiquidityWithSwapParams,
  IRouter,
  RemoveLiquidityParams,
  StakeParams,
  SwapExactTokensParams,
  TransactionConfig,
} from './types';
import { Call } from '@/utils/types';
import { AerodromeConnectorABI } from '@/constants/abis';
import useSystemFunctions from './useSystemFunctions';
import { useMakeCalls } from './useCalls';

async function handleTransaction(client: PublicClient, { hash, waitForReceipt = true }: TransactionConfig) {
  if (!waitForReceipt) return { hash };

  const receipt = await client.waitForTransactionReceipt({
    hash,
  });

  return {
    hash,
    receipt,
  };
}

export function useLiquidity(publicClient: PublicClient) {
  const { smartAccountState } = useSystemFunctions();
  const { makeCalls, buildUserOperationCalldata } = useMakeCalls();
  const account = smartAccountState.address as Address;

  const createPluginCall = useCallback(
    (connectorData: Hex, index: number) => {
      const pluginCalldata = encodePluginExecute(AERODROME_CONNECTOR, connectorData);
      return {
        index,
        target: CONNECTOR_PLUGIN,
        data: pluginCalldata,
        value: 0n,
      };
    },
    [AERODROME_CONNECTOR, CONNECTOR_PLUGIN]
  );

  const addLiquidity = useCallback(
    async (params: AddLiquidityWithSwapParams, txConfig?: Partial<TransactionConfig>) => {
      const calls: Call[] = [];
      let currentIndex = 0;

      // Validate input amounts
      if (!params.amountAIn || !params.amountBIn) {
        throw new Error('Invalid input amounts');
      }

      // Handle pre-swap if configured
      if (params.preSwap?.enabled) {
        if (!params.preSwap.params.amountIn) {
          throw new Error('Invalid swap amount');
        }

        // Approve token for swap
        const swapApproveAmount = parseUnits(params.preSwap.params.amountIn.toString(), params.preSwap.params.tokenA.decimals);

        const approveSwapTokenData = encodeApprove({
          amount: swapApproveAmount,
          spender: AERODROME_CONNECTOR,
        });

        calls.push({
          index: currentIndex++,
          target: params.preSwap.params.tokenA.address,
          data: approveSwapTokenData,
          value: 0n,
        });

        // Create swap routes
        const routes: IRouter.RouteStruct[] = [
          {
            from: params.preSwap.params.tokenA.address,
            to: params.preSwap.params.tokenB.address,
            stable: params.preSwap.params.stable,
            factory: AERODROME_FACTORY_ADDRESS,
          },
        ];

        // Add swap call
        const swapData = encodeSwap({
          amountIn: swapApproveAmount,
          minReturnAmount: parseUnits(params.preSwap.params.minReturnAmount?.toString() || '0', params.preSwap.params.tokenB.decimals),
          routes,
          to: params.preSwap.params.to,
          deadline: BigInt(Math.floor(Date.now() / 1000) + 3600),
          caller: account,
        });

        calls.push(createPluginCall(swapData, currentIndex++));
      }

      console.log('Add Liquidity Params:', {
        tokenA: params.tokenA.address,
        tokenB: params.tokenB.address,
        decimalsA: params.tokenA.decimals,
        decimalsB: params.tokenB.decimals,
        amountAIn: params.amountAIn,
        amountBIn: params.amountBIn,
        stable: params.stable,
      });

      // Get quotes for liquidity deposit
      const quotes = await quoteDepositLiquidity(
        params.tokenA.address,
        params.tokenB.address,
        params.stable,
        parseUnits(params.amountAIn.toString(), params.tokenA.decimals),
        parseUnits(params.amountBIn.toString(), params.tokenB.decimals)
      );

      // Add approvals for liquidity tokens
      const approveTokenAData = encodeApprove({
        amount: parseUnits(params.amountAIn.toString(), params.tokenA.decimals),
        spender: AERODROME_CONNECTOR,
      });

      const approveTokenBData = encodeApprove({
        amount: parseUnits(params.amountBIn.toString(), params.tokenB.decimals),
        spender: AERODROME_CONNECTOR,
      });

      calls.push(
        {
          index: currentIndex++,
          target: params.tokenA.address,
          data: approveTokenAData,
          value: 0n,
        },
        {
          index: currentIndex++,
          target: params.tokenB.address,
          data: approveTokenBData,
          value: 0n,
        }
      );

      // Add liquidity call
      const addLiquidityData = encodeAddLiquidity({
        tokenA: params.tokenA.address,
        tokenB: params.tokenB.address,
        stable: params.stable,
        amountAIn: parseUnits(params.amountAIn.toString(), params.tokenA.decimals),
        amountBIn: parseUnits(params.amountBIn.toString(), params.tokenB.decimals),
        amountAMin: quotes?.amountAOut ?? 0n,
        amountBMin: quotes?.amountBOut ?? 0n,
        balanceTokenRatio: false,
        to: account,
        deadline: BigInt(Math.floor(Date.now() / 1000) + 3600),
        caller: account,
      });

      //calls.push(createPluginCall(addLiquidityData, currentIndex));

      const { opHash } = await makeCalls({
        calls,
        account,
      });
      return handleTransaction(publicClient, {
        hash: opHash as `0x${string}`,
        ...txConfig,
      });
    },
    [publicClient, createPluginCall, account]
  );

  const removeLiquidity = useCallback(
    async (params: RemoveLiquidityParams, txConfig?: Partial<TransactionConfig>) => {
      const connectorData = encodeRemoveLiquidity({
        tokenA: params.tokenA.address,
        tokenB: params.tokenB.address,
        stable: params.stable,
        liquidity: BigInt(params.liquidity),
        amountAMin: parseUnits(params.amountAMin.toString(), params.tokenA.decimals),
        amountBMin: parseUnits(params.amountBMin.toString(), params.tokenB.decimals),
        to: account,
        deadline: BigInt(Math.floor(Date.now() / 1000) + 3600),
        caller: account,
      });

      const call = createPluginCall(connectorData, 0);

      const { opHash } = await makeCalls({
        calls: [call],
        account,
      });
      return handleTransaction(publicClient, {
        hash: opHash as `0x${string}`,
        ...txConfig,
      });
    },
    [publicClient, createPluginCall, account]
  );

  const swap = useCallback(
    async (params: SwapExactTokensParams, txConfig?: Partial<TransactionConfig>) => {
      const routes: IRouter.RouteStruct[] = [
        {
          from: params.tokenA.address,
          to: params.tokenB.address,
          stable: params.stable,
          factory: AERODROME_FACTORY_ADDRESS,
        },
      ];

      const connectorData = encodeSwap({
        amountIn: parseUnits(params.amountIn.toString(), params.tokenA.decimals),
        minReturnAmount: parseUnits(params.minReturnAmount.toString(), params.tokenB.decimals),
        routes,
        to: params.to,
        deadline: BigInt(Math.floor(Date.now() / 1000) + 3600),
        caller: account,
      });

      const call = createPluginCall(connectorData, 0);

      const { opHash } = await makeCalls({
        calls: [call],
        account,
      });
      return handleTransaction(publicClient, {
        hash: opHash as `0x${string}`,
        ...txConfig,
      });
    },
    [publicClient, createPluginCall, account]
  );

  const stake = useCallback(
    async (params: StakeParams, txConfig?: Partial<TransactionConfig>) => {
      const connectorData = encodeStake({
        gaugeAddress: params.gauge.address,
        amount: parseUnits(params.amount.toString(), params.gauge.decimals),
        caller: account,
      });

      const call = createPluginCall(connectorData, 0);

      const { opHash } = await makeCalls({
        calls: [call],
        account,
      });
      return handleTransaction(publicClient, {
        hash: opHash as `0x${string}`,
        ...txConfig,
      });
    },
    [publicClient, createPluginCall, account]
  );

  const quoteDepositLiquidity: any = async (tokenA: Address, tokenB: Address, stable: boolean, amountA: bigint, amountB: bigint) => {
    try {
      console.log('Quote Deposit Params:', {
        tokenA,
        tokenB,
        stable,
        amountA: amountA.toString(),
        amountB: amountB.toString(),
        balanceTokenRatio: stable,
      });

      // Ensure amounts are not zero
      if (amountA <= 0n || amountB <= 0n) {
        throw new Error('Invalid amounts for quote');
      }

      const result = await publicClient.readContract({
        address: AERODROME_CONNECTOR,
        abi: AerodromeConnectorABI.abi,
        functionName: 'quoteDepositLiquidity',
        args: [tokenA, tokenB, stable, amountA, amountB, stable],
      });

      console.log('Quote Result:', result);

      if (!result) {
        return {
          amountAOut: 0n,
          amountBOut: 0n,
        };
      }

      return result;
    } catch (error) {
      console.error('Quote Deposit Error:', error);
      // Return minimum amounts as fallback
      return {
        amountAOut: (amountA * BigInt(95)) / BigInt(100), // 95% of input as minimum
        amountBOut: (amountB * BigInt(95)) / BigInt(100),
      };
    }
  };

  return {
    addLiquidity,
    removeLiquidity,
    swap,
    stake,
  };
}
