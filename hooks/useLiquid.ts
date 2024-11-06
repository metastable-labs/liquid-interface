import { useCallback } from 'react';
import { Address, parseUnits, erc20Abi, Hex, PublicClient, WaitForTransactionReceiptParameters } from 'viem';
import { makeCalls } from '@/utils/calls';
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

export function useLiquidity(publicClient: PublicClient, account: Address) {
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

      // Handle pre-swap if configured
      if (params.preSwap?.enabled) {
        // Approve token for swap
        const swapApproveAmount = parseUnits(params.preSwap.params.amountIn, params.preSwap.params.tokenA.decimals);

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
          minReturnAmount: parseUnits(params.preSwap.params.minReturnAmount, params.preSwap.params.tokenB.decimals),
          routes,
          to: params.preSwap.params.to,
          deadline: BigInt(Math.floor(Date.now() / 1000) + 3600),
        });

        calls.push(createPluginCall(swapData, currentIndex++));
      }

      // Get quotes for liquidity deposit
      const quotes = await quoteDepositLiquidity(
        params.tokenA.address,
        params.tokenB.address,
        params.stable,
        parseUnits(params.amountAIn, params.tokenA.decimals),
        parseUnits(params.amountBIn, params.tokenB.decimals)
      );

      // Add approvals for liquidity tokens
      const approveTokenAData = encodeApprove({
        amount: parseUnits(params.amountAIn, params.tokenA.decimals),
        spender: AERODROME_CONNECTOR,
      });

      const approveTokenBData = encodeApprove({
        amount: parseUnits(params.amountBIn, params.tokenB.decimals),
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
      const refactoredParams = {
        ...params,
        amountAIn: parseUnits(params.amountAIn, params.tokenA.decimals),
        amountBIn: parseUnits(params.amountBIn, params.tokenB.decimals),
        amountAMin: parseUnits(quotes.amountAOut, params.tokenA.decimals),
        amountBMin: parseUnits(quotes.amountBOut, params.tokenB.decimals),
        balanceTokenRatio: false,
        deadline: BigInt(Math.floor(Date.now() / 1000) + 3600),
      };

      const addLiquidityData = encodeAddLiquidity(refactoredParams);
      calls.push(createPluginCall(addLiquidityData, currentIndex));

      const { opHash } = await makeCalls({
        calls,
        account,
      });

      return handleTransaction(publicClient, {
        hash: opHash,
        ...txConfig,
      });
    },
    [publicClient, createPluginCall]
  );

  const removeLiquidity = useCallback(
    async (params: RemoveLiquidityParams, txConfig?: Partial<TransactionConfig>) => {
      const refactoredParams = {
        ...params,
        liquidity: BigInt(params.liquidity),
        amountAMin: parseUnits(params.amountAMin.toString(), params.tokenA.decimals),
        amountBMin: parseUnits(params.amountBMin.toString(), params.tokenB.decimals),
        deadline: BigInt(Math.floor(Date.now() / 1000) + 3600),
      };
      const connectorData = encodeRemoveLiquidity(refactoredParams);
      const call = createPluginCall(connectorData, 0);

      const { opHash } = await makeCalls({
        calls: [call],
        account,
      });

      return handleTransaction(publicClient, {
        hash: opHash,
        ...txConfig,
      });
    },
    [publicClient, createPluginCall]
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
      });
      const call = createPluginCall(connectorData, 0);

      const { opHash } = await makeCalls({
        calls: [call],
        account,
      });

      return handleTransaction(publicClient, {
        hash: opHash,
        ...txConfig,
      });
    },
    [publicClient, createPluginCall]
  );

  const stake = useCallback(
    async (params: StakeParams, txConfig?: Partial<TransactionConfig>) => {
      const connectorData = encodeStake({
        gaugeAddress: params.gauge.address,
        amount: parseUnits(params.amount.toString(), params.gauge.decimals),
      });
      const call = createPluginCall(connectorData, 0);

      const { opHash } = await makeCalls({
        calls: [call],
        account,
      });

      return handleTransaction(publicClient, {
        hash: opHash,
        ...txConfig,
      });
    },
    [publicClient, createPluginCall]
  );

  const quoteDepositLiquidity = async (tokenA: string, tokenB: Address, stable: boolean, amountA: bigint, amountB: bigint) => {
    const balanceTokenRatio = stable;
    const result: any = await publicClient.readContract({
      address: AERODROME_CONNECTOR,
      abi: AerodromeConnectorABI.abi,
      functionName: 'quoteDepositLiquidity',
      args: [tokenA, tokenB, stable, amountA, amountB, balanceTokenRatio],
    });

    return result;
  };

  return {
    addLiquidity,
    removeLiquidity,
    swap,
    stake,
  };
}
