import { BundlerClient } from 'permissionless';
import { Address, Hex } from 'viem';
import { buildUserOp, getUserOpHash } from './wallet';
import { Call } from './types';
import { entryPoint06Address } from 'viem/_types/account-abstraction';

// Main function to execute calls
export async function makeCalls({
  calls,
  client,
  account,
  paymasterData = '0x' as Hex,
  verificationGasLimit = 800000n,
}: {
  calls: Call[];
  client: BundlerClient;
  account: Address;
  paymasterData?: Hex;
  verificationGasLimit?: bigint;
}) {
  // Build the user operation
  const op = await buildUserOp(account, client, {
    calls,
    paymasterAndData: paymasterData,
  });

  // Set verification gas limit
  op.verificationGasLimit = verificationGasLimit;

  // Get the operation hash
  const hash = getUserOpHash({
    userOperation: op,
    chainId: 8543n,
  });

  // TODO: get smart wallet from reducer and sign the hash
  const signature =
    '0xc66a718123aa330c0d00439ed337bc6721c20298be9fb50bb0e8723b6340a7dc65bc37d891cb278953722d0a93f6daf784dde4e1396e8f57acc64c8d1ea9a602';

  op.signature = signature;

  // Send the user operation
  const opHash = await client.sendUserOperation({
    userOperation: op,
    entryPoint: entryPoint06Address,
  });

  return {
    opHash,
    userOpHash: hash,
  };
}
