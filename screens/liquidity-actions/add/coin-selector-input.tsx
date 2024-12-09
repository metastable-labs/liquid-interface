import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

import { formatAmount, removeCommasFromNumber } from '@/utils/helpers';
import { LQDAssetSelection } from '@/components';
import { CaretDownIcon } from '@/assets/icons';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { TokenItem } from '@/store/account/types';
import { coinSelectorInputStyles as styles } from './styles';

const CoinSelectorInput = ({ onChange, selectedToken, value, disabled, address }: ICoinSelectorInput) => {
  const { accountState } = useSystemFunctions();
  const { tokens } = accountState;

  const [token, setToken] = useState<TokenItem>();
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const invalidAmount = parseFloat(removeCommasFromNumber(value)) > Number(token?.balance || 0);

  const setAsset = (asset: TokenItem) => {
    setToken(asset);
    selectedToken(asset.address);
  };

  useEffect(
    function initToken() {
      if (!tokens?.data) return;

      const initialToken = tokens?.data.find((t) => t.address === address) || tokens?.data[0];
      setToken(initialToken);
    },
    [tokens, address]
  );

  return (
    <>
      <View style={styles.container}>
        <TextInput
          value={value}
          keyboardType="decimal-pad"
          style={[styles.input, invalidAmount && styles.invalidText]}
          onChangeText={onChange}
          pointerEvents={disabled ? 'none' : 'auto'}
          placeholder="0.0"
        />

        <View style={styles.tokenContainer}>
          <TouchableOpacity style={styles.tokenSelector} onPress={() => setShowBottomSheet(true)}>
            <View style={styles.icon}>
              <FastImage
                source={{ uri: token?.logoUrl, priority: FastImage.priority.high }}
                style={{ width: 20, height: 20, borderRadius: 9999 }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>

            <Text style={styles.tokenText}>{token?.symbol}</Text>

            <CaretDownIcon />
          </TouchableOpacity>

          <View style={styles.balanceInfo}>
            <Text style={[styles.balanceTitle, invalidAmount && styles.invalidText]}>
              {invalidAmount ? 'Not enough balance:' : 'Available:'}
            </Text>
            <Text style={[styles.balanceValue, invalidAmount && styles.invalidText]}>
              {formatAmount(token?.balance).toLocaleString()} {token?.symbol}
            </Text>
          </View>
        </View>
      </View>

      <LQDAssetSelection
        close={() => setShowBottomSheet(false)}
        setAsset={setAsset}
        show={showBottomSheet}
        title="Select token"
        selectedAsset={token}
      />
    </>
  );
};

export default CoinSelectorInput;
