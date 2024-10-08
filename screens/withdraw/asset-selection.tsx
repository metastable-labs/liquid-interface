import { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';

import { LQDBottomSheet, LQDInput } from '@/components';
import { IAsset, IAssetSelection } from './types';
import { assets } from './dummy';

const AssetSelection = ({ close, setAsset, show, asset }: IAssetSelection) => {
  const { control, watch } = useForm();
  const searchValue = watch('search', '');

  const searchedAssets = useMemo(() => {
    if (!searchValue) return assets;
    return assets.filter(
      (asset) =>
        asset.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

  const action = (active: boolean, asset: IAsset) => {
    if (!active) {
      setAsset(asset);
      close();
    }
  };

  return (
    <LQDBottomSheet
      show={show}
      title="Select Asset"
      variant="secondary"
      onClose={close}
    >
      <View style={styles.root}>
        <LQDInput
          control={control}
          name="search"
          rules={{ required: true }}
          inputProps={{
            keyboardType: 'default',
            autoCapitalize: 'none',
            placeholder: 'Search...',
          }}
          variant="search"
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {searchedAssets.map((asset_, index) => {
            const active = asset?.id === asset_?.id;

            return (
              <TouchableOpacity
                key={index}
                style={styles.selector}
                onPress={() => action(active, asset_)}
                disabled={active}
              >
                <View style={styles.selectorContainer}>
                  <View style={styles.iconContainer}>
                    <Image
                      source={{ uri: asset_?.iconUrl }}
                      style={styles.icon}
                    />
                  </View>

                  <View style={styles.textContainer}>
                    <Text style={styles.primaryText}>{asset_?.name}</Text>
                    <Text style={styles.secondaryText}>
                      {asset_.balance.toLocaleString()} {asset_?.symbol}
                    </Text>
                  </View>
                </View>

                {active && (
                  <View style={styles.checkMarkContainer}>
                    <Ionicons name="checkmark" size={10} color="#FFFFFF" />
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

export default AssetSelection;

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
    fontSize: 14,
    lineHeight: 18.48,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  secondaryText: {
    color: '#64748B',
    fontSize: 11,
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
