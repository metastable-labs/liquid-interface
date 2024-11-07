import { useCallback } from 'react';
import { Address, Hex, PublicClient, WaitForTransactionReceiptParameters } from 'viem';
import { makeCalls } from '@/utils/calls';
import { encodePluginExecute, encodeAddLiquidity, encodeRemoveLiquidity, encodeSwap, encodeStake } from '@/utils/encoders';
import { AERODROME_CONNECTOR, CONNECTOR_PLUGIN } from '@/constants/addresses';
import { AddLiquidityParams, RemoveLiquidityParams, StakeParams, SwapExactTokensParams, TransactionConfig } from './types';

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
    (connectorData: Hex) => {
      const pluginCalldata = encodePluginExecute(AERODROME_CONNECTOR, connectorData);
      return {
        target: CONNECTOR_PLUGIN,
        value: 0n,
        data: pluginCalldata,
        index: 0,
      };
    },
    [AERODROME_CONNECTOR, CONNECTOR_PLUGIN]
  );

  const addLiquidity = useCallback(
    async (params: AddLiquidityParams, txConfig?: Partial<TransactionConfig>) => {
      const connectorData = encodeAddLiquidity(params);
      const call = createPluginCall(connectorData);

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

  const removeLiquidity = useCallback(
    async (params: RemoveLiquidityParams, txConfig?: Partial<TransactionConfig>) => {
      const connectorData = encodeRemoveLiquidity(params);
      const call = createPluginCall(connectorData);

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
      const connectorData = encodeSwap(params);
      const call = createPluginCall(connectorData);

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
      const connectorData = encodeStake(params);
      const call = createPluginCall(connectorData);

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

  return {
    addLiquidity,
    removeLiquidity,
    swap,
    stake,
  };
}
