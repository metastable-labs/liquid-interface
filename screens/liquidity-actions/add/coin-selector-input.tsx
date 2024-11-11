import { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';

import { removeCommasFromNumber } from '@/utils/helpers';
import { LQDAssetSelection } from '@/components';
import { CaretDownIcon } from '@/assets/icons';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { TokenItem } from '@/store/account/types';
import { coinSelectorInputStyles as styles } from './styles';

const CoinSelectorInput = ({ onChange, selectedToken, value, disabled, address }: ICoinSelectorInput) => {
  const { accountState } = useSystemFunctions();
  const { tokens } = accountState;

  const [token, setToken] = useState(tokens?.data.find((t) => t.address === address) || tokens?.data[0]);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const invalidAmount = parseFloat(removeCommasFromNumber(value)) > Number(token?.balance || 0);

  const setAsset = (asset: TokenItem) => {
    setToken(asset);
    selectedToken(asset.address);
  };

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
              <Image source={{ uri: token?.logoUrl }} style={{ width: 20, height: 20 }} />
            </View>

            <Text style={styles.tokenText}>{token?.symbol}</Text>

            <CaretDownIcon />
          </TouchableOpacity>

          <View style={styles.balanceInfo}>
            <Text style={[styles.balanceTitle, invalidAmount && styles.invalidText]}>
              {invalidAmount ? 'Not enough balance:' : 'Available:'}
            </Text>
            <Text style={[styles.balanceValue, invalidAmount && styles.invalidText]}>
              {token?.balance.toLocaleString()} {token?.symbol}
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
