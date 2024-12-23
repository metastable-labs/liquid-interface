import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import '@walletconnect/react-native-compat';
import { WalletConnectModal } from '@walletconnect/modal-react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import walletConfig from '@/utils/walletConnect';
import { LQDButton } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { walletConnectProjectId } from '@/constants/env';
import { useWalletConnect } from '@/providers';
import RequestModal from './request-modal';

function WalletConnect() {
  const { isConnected, connect } = useWalletConnect();
  const { router } = useSystemFunctions();
  const [modalVisible, setModalVisible] = useState(false);
  const [rpcResponse, setRpcResponse] = useState<any>();
  const [loading, setLoading] = useState(false);

  const onCopy = (value: string) => {
    Clipboard.setString(value);
  };

  const onConnect = () => {
    try {
      if (isConnected) {
        return router.push('/deposit/crypto-wallet');
      }
      connect();
    } catch (error) {
      console.error('Error connecting to WalletConnect:', error);
    }
  };

  const onModalClose = () => {
    setModalVisible(false);
    setLoading(false);
    setRpcResponse(undefined);
  };

  return (
    <SafeAreaView>
      <LQDButton onPress={onConnect} variant="light" title={isConnected ? 'Proceed' : 'Connect wallet'} />

      <WalletConnectModal
        projectId={walletConnectProjectId}
        providerMetadata={walletConfig.providerMetadata}
        sessionParams={walletConfig.sessionParams}
        onCopyClipboard={onCopy}
      />
      <RequestModal isVisible={modalVisible} onClose={onModalClose} isLoading={loading} rpcResponse={rpcResponse} />
    </SafeAreaView>
  );
}

export default WalletConnect;
