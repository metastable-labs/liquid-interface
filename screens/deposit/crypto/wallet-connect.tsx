import React, { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import '@walletconnect/react-native-compat';
import { useWalletConnectModal, WalletConnectModal } from '@walletconnect/modal-react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import { createWalletClient, custom, parseEther, WalletClient } from 'viem';
import { base } from 'viem/chains';
import walletConfig from '@/utils/walletConnect';

import RequestModal from './request-modal';
import { LQDButton } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { useToastActions } from '@/store/toast/actions';

function WalletConnect() {
  const { router } = useSystemFunctions();
  const { showToast } = useToastActions();
  const { isConnected, provider, open } = useWalletConnectModal();
  const [modalVisible, setModalVisible] = useState(false);
  const [rpcResponse, setRpcResponse] = useState<any>();
  const [loading, setLoading] = useState(false);

  const walletClient: WalletClient | undefined = useMemo(
    () =>
      createWalletClient({
        chain: base,
        transport: custom({
          async request({ method, params }) {
            return await provider?.request({ method, params });
          },
        }),
      }),
    [provider]
  );

  const onConnect = () => {
    try {
      if (isConnected) {
        router.push('/deposit/crypto-wallet');
        return provider?.disconnect();
      }

      return open();
    } catch (error: any) {
      console.error('error', error);
      showToast({
        title: 'Error connecting wallet',
        description: error?.message || 'Unable to connect your wallet. Please try again!',
        variant: 'error',
      });
    }
  };

  const onCopy = (value: string) => {
    Clipboard.setString(value);
  };

  const onResponse = (response: any) => {
    setRpcResponse(response);
    setLoading(false);
  };

  const onModalClose = () => {
    setModalVisible(false);
    setLoading(false);
    setRpcResponse(undefined);
  };

  const onAction = (callback: any) => async () => {
    try {
      setLoading(true);
      setModalVisible(true);
      const response = await callback();
      onResponse(response);
    } catch (error: any) {
      onResponse({
        error: error?.message || 'error',
      });
    }
  };

  const onSendTransaction = async () => {
    if (!walletClient) {
      return;
    }
    const [address] = await walletClient.getAddresses();

    const hash = await walletClient.sendTransaction({
      chain: base,
      account: address,
      to: '0x704457b418E9Fb723e1Bc0cB98106a6B8Cf87689', // test address
      value: parseEther('0.001'),
      data: '0x',
    });

    return {
      method: 'send transaction',
      response: hash,
    };
  };

  const onSignMessage = async () => {
    if (!walletClient) {
      return;
    }
    const [address] = await walletClient.getAddresses();

    const signature = await walletClient.signMessage({
      account: address,
      message: 'Hello World!',
    });
    return {
      method: 'sign message',
      signature: signature,
    };
  };

  const actionButtonsTemplate = () => {
    if (!isConnected) {
      return null;
    }

    return (
      <>
        <TouchableOpacity
          style={[styles.button, !isConnected && styles.buttonDisabled]}
          disabled={!isConnected}
          onPress={onAction(onSendTransaction)}
        >
          <Text style={styles.buttonText}>Send Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !isConnected && styles.buttonDisabled]}
          disabled={!isConnected}
          onPress={onAction(onSignMessage)}
        >
          <Text style={styles.buttonText}>Sign Message</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[styles.button, !isConnected && styles.buttonDisabled]}
          disabled={!isConnected}
          onPress={onAction(onReadContract)}
        >
          <Text style={styles.buttonText}>Read Contract</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !isConnected && styles.buttonDisabled]}
          disabled={!isConnected}
          onPress={onAction(onWriteContract)}
        >
          <Text style={styles.buttonText}>Write Contract</Text>
        </TouchableOpacity> */}
      </>
    );
  };

  return (
    <SafeAreaView>
      <LQDButton onPress={onConnect} variant="light" title={isConnected ? 'Proceed' : 'Connect wallet'} />

      {actionButtonsTemplate()}

      <WalletConnectModal
        projectId={'cec744df4c0366f1303ffdbf2352a3b5'}
        providerMetadata={walletConfig.providerMetadata}
        sessionParams={walletConfig.sessionParams}
        onCopyClipboard={onCopy}
      />
      <RequestModal isVisible={modalVisible} onClose={onModalClose} isLoading={loading} rpcResponse={rpcResponse} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3396FF',
    borderRadius: 20,
    width: 150,
    height: 40,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: 4,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  title: {
    fontSize: 26,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 30,
  },
});

export default WalletConnect;
