import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { WalletClient, createWalletClient, custom } from 'viem';
import { base, mainnet } from 'viem/chains';
import { useToastActions } from '@/store/toast/actions';
import type { SwitchChainErrorType } from 'viem/_types/errors/rpc';

interface WalletConnectContextType {
  isConnected: boolean;
  walletClient: WalletClient | undefined;
  provider: any;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletConnectContext = createContext<WalletConnectContextType | undefined>(undefined);

export const WalletConnectProvider = ({ children }: PropsWithChildren) => {
  const { showToast } = useToastActions();
  const { isConnected, provider, open } = useWalletConnectModal();

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

  useEffect(
    function switchNetwork() {
      if (isConnected) {
        // switchToBaseNetwork();
      }
    },
    [isConnected]
  );

  const value = useMemo(
    () => ({
      isConnected,
      walletClient,
      provider,
      connect,
      disconnect,
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
