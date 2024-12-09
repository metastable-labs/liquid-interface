import { Address, Hex, encodeFunctionData, encodeAbiParameters, parseAbiParameters, erc20Abi } from 'viem';
import { AerodromeConnectorABI, ConnectorPluginABI } from '@/constants/abis';

interface RouteStruct {
  from: Address;
  to: Address;
  stable: boolean;
  factory: Address;
}

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
  caller,
}: {
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
  caller: Address;
}) {
  const params = encodeAbiParameters(parseAbiParameters('bytes, address'), [
    encodeAbiParameters(parseAbiParameters('address, address, bool, uint256, uint256, uint256, uint256, bool, address, uint256'), [
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
    ]),
    caller,
  ]);

  return encodeFunctionData({
    abi: AerodromeConnectorABI.abi,
    functionName: 'execute',
    args: [params],
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
  caller,
}: {
  tokenA: Address;
  tokenB: Address;
  stable: boolean;
  liquidity: bigint;
  amountAMin: bigint;
  amountBMin: bigint;
  to: Address;
  deadline: bigint;
  caller: Address;
}) {
  const params = encodeAbiParameters(parseAbiParameters('bytes, address'), [
    encodeAbiParameters(parseAbiParameters('address, address, bool, uint256, uint256, uint256, address, uint256'), [
      tokenA,
      tokenB,
      stable,
      liquidity,
      amountAMin,
      amountBMin,
      to,
      deadline,
    ]),
    caller,
  ]);

  return encodeFunctionData({
    abi: AerodromeConnectorABI.abi,
    functionName: 'execute',
    args: [params],
  });
}

export function encodeSwap({
  amountIn,
  minReturnAmount,
  routes,
  to,
  deadline,
  caller,
}: {
  amountIn: bigint;
  minReturnAmount: bigint;
  routes: RouteStruct[];
  to: Address;
  deadline: bigint;
  caller: Address;
}) {
  const params = encodeAbiParameters(parseAbiParameters('bytes, address'), [
    encodeAbiParameters(
      [
        { type: 'uint256' },
        { type: 'uint256' },
        {
          type: 'tuple[]',
          components: [
            { name: 'from', type: 'address' },
            { name: 'to', type: 'address' },
            { name: 'stable', type: 'bool' },
            { name: 'factory', type: 'address' },
          ],
        },
        { type: 'address' },
        { type: 'uint256' },
      ],
      [amountIn, minReturnAmount, routes, to, deadline]
    ),
    caller,
  ]);

  return encodeFunctionData({
    abi: AerodromeConnectorABI.abi,
    functionName: 'execute',
    args: [params],
  });
}

export function encodeStake({ gaugeAddress, amount, caller }: { gaugeAddress: Address; amount: bigint; caller: Address }) {
  const params = encodeAbiParameters(parseAbiParameters('bytes, address'), [
    encodeAbiParameters(parseAbiParameters('address, uint256'), [gaugeAddress, amount]),
    caller,
  ]);

  return encodeFunctionData({
    abi: AerodromeConnectorABI.abi,
    functionName: 'execute',
    args: [params],
  });
}

export function encodeApprove({ amount, spender }: { amount: bigint; spender: Address }) {
  return encodeFunctionData({
    abi: erc20Abi,
    functionName: 'approve',
    args: [spender, amount],
  });
}
