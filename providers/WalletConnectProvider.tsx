import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo } from 'react';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { PublicClient, WalletClient, createPublicClient, createWalletClient, custom } from 'viem';
import { base, mainnet } from 'viem/chains';
import { useToastActions } from '@/store/toast/actions';
import { UsdcAbi } from '@/constants/abis';
import { removeCommasFromNumber } from '@/utils/helpers';

interface WalletConnectContextType {
  isConnected: boolean;
  walletClient: WalletClient | undefined;
  publicClient: PublicClient | undefined;
  provider: any;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  address?: string;
  getUsdcBalance: () => Promise<string>;
  isOpen: boolean;
  depoditUsdc: (amount: string, recipient: `0x${string}`) => Promise<any>;
}

const WalletConnectContext = createContext<WalletConnectContextType | undefined>(undefined);

export const WalletConnectProvider = ({ children }: PropsWithChildren) => {
  const { showToast } = useToastActions();
  const { isConnected, provider, open, address, isOpen } = useWalletConnectModal();

  const walletClient: WalletClient | undefined = useMemo(
    () =>
      createWalletClient({
        chain: mainnet,
        transport: custom({
          async request({ method, params }) {
            return await provider?.request({ method, params });
          },
        }),
      }),
    [provider]
  );

  const publicClient: PublicClient | undefined = useMemo(
    () =>
      createPublicClient({
        chain: mainnet,
        transport: custom({
          async request({ method, params }) {
            return await provider?.request({ method, params });
          },
        }),
      }),
    [provider]
  );

  const switchToBaseNetwork = async () => {
    if (!provider) {
      throw new Error('Provider not available');
    }
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x2105' }], // 8453 in hexadecimal
      });
    } catch (switchError: any) {
      // If the chain is not added to the wallet, add it
      if (switchError?.code && switchError?.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x2105',
                chainName: 'Base',
                rpcUrls: ['https://rpc.base.org'],
                nativeCurrency: {
                  name: 'Base Ether',
                  symbol: 'ETH',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://basescan.org'],
              },
            ],
          });
        } catch (addError) {
          console.error('Error adding Base network:', addError);
          throw addError;
        }
      } else {
        console.error('Error switching network:', switchError);
        throw switchError;
      }
    }
  };

  const getUsdcBalance = async () => {
    try {
      if (!walletClient || !publicClient) {
        console.error('Client not available');
        return '0';
      }

      const [address] = await walletClient.getAddresses();

      const balance = await publicClient?.readContract({
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        abi: UsdcAbi.UsdcAbi.abi,
        functionName: 'balanceOf',
        args: [address],
      });

      const formattedBalance = (Number(balance) / 10 ** 6).toFixed(2);

      return formattedBalance;
    } catch (error) {
      console.error('Error fetching USDC balance:', error);
      return '0';
    }
  };

  const depoditUsdc = async (amount: string, recipient: `0x${string}`) => {
    try {
      if (!walletClient || !publicClient) {
        return;
      }
      const [account] = await walletClient.getAddresses();

      const usdcContractAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
      const transferAmount = BigInt(Math.floor(parseFloat(amount) * 10 ** 6));

      const { request } = await publicClient.simulateContract({
        account,
        address: usdcContractAddress as `0x${string}`,
        abi: UsdcAbi.UsdcAbi.abi,
        functionName: 'transfer',
        args: [recipient, transferAmount],
      });
      const hash = await walletClient?.writeContract(request);

      showToast({
        title: 'Deposit successful!',
        description: `Your deposit of ${amount} USDC was successful!`,
        variant: 'success',
      });

      return {
        method: 'write contract',
        response: hash,
      };
    } catch (error: any) {
      const errorMessage = error.message || error.toString();
      const errorDetails = errorMessage.match(/Details: (.*)/);
      const msg = errorDetails ? errorDetails[1] : errorMessage;

      if (msg.includes('User cancelled the request')) {
        showToast({
          title: 'Transaction cancelled!',
          description: 'You cancelled the transaction',
          variant: 'info',
        });
      } else {
        showToast({
          title: 'Transaction cancelled!',
          description: 'Something went wrong. Please try again',
          variant: 'warning',
        });
      }

      throw error;
    }
  };

  const connect = async () => {
    try {
      return open();
    } catch (error) {
      console.error('Error connecting to WalletConnect:', error);
      showToast({
        title: 'Error connecting wallet',
        description: 'Unable to connect your wallet. Please try again!',
        variant: 'error',
      });
    }
  };

  const disconnect = async () => {
    try {
      if (!isConnected || !provider) return;

      await provider.disconnect();
    } catch (error) {
      console.error('Error disconnecting from WalletConnect:', error);
      showToast({
        title: 'Error disconnecting wallet',
        description: 'Unable to disconnect your wallet. Please try again!',
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    if (isConnected && walletClient && publicClient) {
    }
  }, [isConnected, walletClient, publicClient]);

  const value = useMemo(
    () => ({
      isConnected,
      walletClient,
      publicClient,
      provider,
      connect,
      disconnect,
      address,
      getUsdcBalance,
      isOpen,
      depoditUsdc,
    }),
    [isConnected, walletClient, provider]
  );

  return <WalletConnectContext.Provider value={value}>{children}</WalletConnectContext.Provider>;
};

export const useWalletConnect = () => {
  const context = useContext(WalletConnectContext);
  if (!context) {
    throw new Error('useWalletConnect must be used within a WalletConnectProvider');
  }
  return context;
};
