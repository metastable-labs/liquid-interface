import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import useTruncateText from '@/hooks/useTruncateText';
import useCopy from '@/hooks/useCopy';
import { adjustFontSizeForIOS, truncate } from '@/utils/helpers';
import { CaretDownIcon, CoinsIcon, CopyIcon } from '@/assets/icons';
import PaymentMethodSelection from '../method-selection';
import sharedStyles from '../styles';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const CryptoDeposit = () => {
  const { smartAccountState } = useSystemFunctions();
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const { handleCopy, hasCopied } = useCopy();

  const address = truncate(smartAccountState?.address || '');
  const tokensImage = require('../../../assets/images/tokens.png');

  return (
    <>
      <View style={styles.root}>
        <View style={styles.container}>
          <QRCode value={smartAccountState?.address || ''} size={206} color="#4691FE" />

          <View style={styles.addressContainer}>
            <View style={styles.addressWrapper}>
              <Text style={[styles.text, { fontWeight: '500' }]}>{address}</Text>
            </View>
            <TouchableOpacity style={styles.copyContainer} onPress={() => handleCopy(smartAccountState?.address || '')}>
              <CopyIcon />
              <Text style={styles.copyText}>{hasCopied ? 'Copied' : 'Copy'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={sharedStyles.paymentSelector} onPress={() => setShowBottomSheet(true)}>
            <CoinsIcon />
            <Text style={[sharedStyles.selectorText, sharedStyles.paymentSelectorText]}>Crypto</Text>
            <CaretDownIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <Image source={tokensImage} style={styles.infoImage} />
          <Text style={styles.text}>Send USDC, ETH or any ERC20 token on Base</Text>
        </View>
      </View>

      <PaymentMethodSelection close={() => setShowBottomSheet(false)} show={showBottomSheet} />
    </>
  );
};

export default CryptoDeposit;

const styles = StyleSheet.create({
  root: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 34,
    flex: 1,
    backgroundColor: '#fff',
    gap: 60,
  },

  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 20,
  },

  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },

  addressWrapper: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
  },

  copyContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    backgroundColor: '#4691FE',
    width: 94,
  },

  copyText: {
    color: '#FFF',
    fontSize: adjustFontSizeForIOS(13, 2),
    lineHeight: 16.12,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  infoContainer: {
    flexDirection: 'row',
    padding: 16,
    alignSelf: 'stretch',
    gap: 16,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#EBF1FF',
  },

  infoImage: {
    width: 31,
    height: 18,
  },

  text: {
    flex: 1,
    color: '#162664',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    textAlign: 'left',
    fontFamily: 'AeonikRegular',
  },
});
