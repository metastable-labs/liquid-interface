import React, { useCallback, useMemo } from 'react';
import { WebView } from 'react-native-webview';
import { generateOnRampURL } from '@coinbase/cbpay-js';

import useAppActions from '@/store/app/actions';
import 'react-native-url-polyfill/auto';
import { StatusBar } from 'react-native';

const LQDCoinbaseWebView = ({ amount, destinationAddress }: CoinbaseProps) => {
  const { coinbaseIsActive } = useAppActions();

  const coinbaseURL = useMemo(() => {
    const options = {
      appId: 'b7ea3461-95af-486a-994f-0b9d57ff8ce3',
      addresses: { destinationAddress: ['base'] },
      assets: ['USDC'],
      handlingRequestedUrls: true,
      presetCryptoAmount: amount,
    };

    const uri = generateOnRampURL(options);

    return uri;
  }, [amount, destinationAddress]);

  const onMessage = useCallback((event: any) => {
    try {
      const { data } = JSON.parse(event.nativeEvent.data);
      console.log('onMessage', data.eventName);
      if (data.eventName === 'request_open_url') {
        // viewUrlInSecondWebview(data.url);
      }

      if (data.eventName === 'exit') {
        coinbaseIsActive(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#ffffff" />
      <WebView source={{ uri: coinbaseURL }} onMessage={onMessage} />
    </>
  );
};

export default LQDCoinbaseWebView;
