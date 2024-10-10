import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { assets as tokens } from '@/screens/withdraw/dummy';
import { removeCommasFromNumber } from '@/utils/helpers';
import { LQDAssetSelection } from '@/components';
import { coinSelectorInputStyles as styles } from './styles';

const CoinSelectorInput = ({
  onChange,
  setTokenId,
  value,
  disabled,
  tokenId,
}: ICoinSelectorInput) => {
  const [token, setToken] = useState(
    tokens.find((t) => t.id === tokenId) || tokens[0]
  );
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const invalidAmount =
    parseFloat(removeCommasFromNumber(value)) > token?.balance!;

  const setAsset = (asset: IAsset) => {
    setToken(asset);
    setTokenId(asset.id);
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
        />

        <View style={styles.tokenContainer}>
          <TouchableOpacity
            style={styles.tokenSelector}
            onPress={() => setShowBottomSheet(true)}
          >
            <View style={styles.icon}>
              <Image
                source={{ uri: token?.iconUrl }}
                style={{ width: 20, height: 20 }}
              />
            </View>

            <Text style={styles.tokenText}>{token?.symbol}</Text>

            <Ionicons name="chevron-down" size={18} color="#94A3B8" />
          </TouchableOpacity>

          <View style={styles.balanceInfo}>
            <Text
              style={[styles.balanceTitle, invalidAmount && styles.invalidText]}
            >
              {invalidAmount ? 'Not enough balance:' : 'Available:'}
            </Text>
            <Text
              style={[styles.balanceValue, invalidAmount && styles.invalidText]}
            >
              {token?.balance.toLocaleString()} {token?.symbol}
            </Text>
          </View>
        </View>

        <LQDAssetSelection
          assets={tokens}
          close={() => setShowBottomSheet(false)}
          setAsset={setAsset}
          show={showBottomSheet}
          title="Select token"
          asset={token}
        />
      </View>
    </>
  );
};

export default CoinSelectorInput;
