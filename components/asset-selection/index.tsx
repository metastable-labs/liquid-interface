import { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';

import { CheckIcon } from '@/assets/icons';
import { adjustFontSizeForIOS, formatAmount } from '@/utils/helpers';
import LQDBottomSheet from '../bottom-sheet';
import LQDInput from '../input';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { AssetSelection } from './types';
import { TokenItem } from '@/store/account/types';

const LQDAssetSelection = ({ close, setAsset, show, title, selectedAsset }: AssetSelection) => {
  const { accountState } = useSystemFunctions();
  const { tokens } = accountState;

  const { control, watch } = useForm();
  const searchValue = watch('search', '');

  const searchedAssets = useMemo(() => {
    if (!searchValue) return tokens.data;

    return tokens.data.filter(
      (asset) => asset.symbol.toLowerCase().includes(searchValue.toLowerCase()) || asset.address.includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

  const action = (active: boolean, asset: TokenItem) => {
    if (active) return;

    setAsset(asset);
    close();
  };

  return (
    <LQDBottomSheet show={show} title={title} variant="secondary" onClose={close}>
      <View style={styles.root}>
        <LQDInput
          control={control}
          name="search"
          rules={{ required: true }}
          inputProps={{
            keyboardType: 'default',
            autoCapitalize: 'none',
            placeholder: title,
          }}
          variant="search"
        />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {searchedAssets.map((_asset, index) => {
            const active = selectedAsset?.address === _asset?.address;

            return (
              <TouchableOpacity key={index} style={styles.selector} onPress={() => action(active, _asset)} disabled={active}>
                <View style={styles.selectorContainer}>
                  <View style={styles.iconContainer}>
                    <Image source={{ uri: _asset?.logoUrl }} style={styles.icon} />
                  </View>

                  <View style={styles.textContainer}>
                    <Text style={styles.primaryText}>{_asset?.symbol}</Text>
                    <Text style={styles.secondaryText}>
                      {formatAmount(_asset.balance).toLocaleString()} {_asset?.symbol}
                    </Text>
                  </View>
                </View>

                {active && (
                  <View style={styles.checkMarkContainer}>
                    <CheckIcon />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </LQDBottomSheet>
  );
};

export default LQDAssetSelection;

const styles = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    gap: 20,
  },

  scrollContent: {
    gap: 24,
    paddingBottom: 100,
  },

  selector: {
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },

  selectorContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 10,
  },

  iconContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#EAEEF4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999,
  },

  icon: {
    width: 24,
    height: 24,
    objectFit: 'contain',
  },

  textContainer: {
    justifyContent: 'center',
    gap: 4,
  },

  primaryText: {
    color: '#1E293B',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  secondaryText: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(11, 2),
    lineHeight: 13.64,
    fontFamily: 'AeonikRegular',
  },

  checkMarkContainer: {
    padding: 3,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4691FE',
    backgroundColor: '#4691FE',
  },
});
