import { StyleSheet, View, Text, StatusBar as RNStatusBar, Pressable, Platform, Animated } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LQDAssetSelection, LQDBottomSheet, LQDButton, LQDFlatlist, LQDInput, LQDProtocolCard, LQDStrategyCard } from '@/components';
import { ArrowCircleDownIcon, DiscoverTVLIcon, SearchIcon, DiscoverUSDIcon, AerodromeIcon } from '@/assets/icons';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { protocolList, strategyies } from './dummy';
import { useForm } from 'react-hook-form';
import PercentageSetter from '../liquidity-actions/remove/percentage-setter';

const Discover = () => {
  const { router, dispatch } = useSystemFunctions();
  const [search, setSearch] = useState(false);
  const [showTvl, setShowTvl] = useState(false);
  const [protocal, setProtocal] = useState(false);
  const [_, setPercentage] = useState(25);
  const [selectedToken, setSelecteToken] = useState('');
  const [selectedAssets, setSelectedAssets] = useState<TokenItem[]>([]);

  const stableSetPercentage = useCallback((value: number) => setPercentage(value), []);
  const { control, watch } = useForm();
  const [showAssets, setShowAssets] = useState(false);

  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: search ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [search]);

  const discoverStyle = {
    opacity: animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
    transform: [
      {
        translateY: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20],
        }),
      },
    ],
  };

  const searchStyle = {
    opacity: animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  };

  const closeInput = () => {
    setSearch((prev) => !prev);
  };

  const openTvl = () => {
    setShowTvl((prev) => !prev);
  };

  const openProtocal = () => {
    setProtocal((prev) => !prev);
  };

  const handleShowAsset = () => {
    setShowAssets((prev) => !prev);
  };

  const handleAsset = (data: TokenItem) => {
    const newAssets = [...selectedAssets];
    newAssets[0] = data;
    setSelectedAssets(newAssets);
  };

  return (
    <View style={styles.container}>
      {!search && (
        <Animated.View style={[styles.discoverTopWrapper, discoverStyle]}>
          <Text style={styles.topText}>Discover</Text>
          <View style={styles.topIconWrapper}>
            <Pressable onPress={openTvl} style={styles.relativeWrapper}>
              <DiscoverTVLIcon />
              <View style={styles.dropIcon}>
                <ArrowCircleDownIcon />
              </View>
            </Pressable>
            <Pressable onPress={handleShowAsset} style={styles.relativeWrapper}>
              <DiscoverUSDIcon />
              <View style={styles.dropIcon}>
                <ArrowCircleDownIcon />
              </View>
            </Pressable>
            <Pressable onPress={openProtocal} style={styles.relativeWrapper}>
              <AerodromeIcon />
              <View style={styles.dropIcon}>
                <ArrowCircleDownIcon />
              </View>
            </Pressable>
            <Pressable onPress={closeInput}>
              <SearchIcon />
            </Pressable>
          </View>
        </Animated.View>
      )}

      {search && (
        <Animated.View style={[styles.searchModalWrapper, searchStyle]}>
          <LQDInput
            control={control}
            name="search"
            rules={{ required: true }}
            inputProps={{
              keyboardType: 'default',
              autoCapitalize: 'none',
              placeholder: '',
            }}
            variant="close"
            iconAction={() => setSearch(false)}
          />
        </Animated.View>
      )}
      <LQDFlatlist
        data={strategyies}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <LQDStrategyCard strategy={item} />}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        style={{ paddingTop: 15 }}
        contentContainerStyle={styles.strategyContainerStyle}
      />

      <LQDBottomSheet show={showTvl} title="TVL" variant="primary" onClose={openTvl}>
        <View style={{ paddingBottom: 50 }}>
          <View style={styles.percentageSetterContainer}>
            <PercentageSetter setPercentage={stableSetPercentage} />
          </View>

          <LQDButton variant="secondary" title="Continue" />
        </View>
      </LQDBottomSheet>
      <LQDBottomSheet show={protocal} title="" variant="primary" onClose={openProtocal}>
        <LQDFlatlist
          data={protocolList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: any) => (
            <LQDProtocolCard
              variant={item.icon}
              selected={selectedToken === item.id}
              protocol={item}
              onSelect={() => setSelecteToken(item.id)}
            />
          )}
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.protocalContainerStyle}
        />
      </LQDBottomSheet>
      <LQDAssetSelection
        key={1}
        close={handleShowAsset}
        setAsset={handleAsset}
        show={showAssets}
        title="Select token"
        selectedAsset={selectedAssets[0]}
      />
    </View>
  );
};

export default Discover;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20,
  },
  topText: {
    flex: 1,
    fontSize: adjustFontSizeForIOS(20, 3),
    fontFamily: 'AeonikMedium',
    fontWeight: '500',
  },
  topIconWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropIcon: { position: 'absolute', bottom: 0, right: 0 },
  relativeWrapper: { position: 'relative' },
  percentageSetterContainer: {
    alignSelf: 'stretch',
    padding: 11,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEEF4',
    marginBottom: 40,
  },
  searchWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 20,
    paddingBottom: Platform.OS === 'android' ? -(RNStatusBar.currentHeight || 0) : -48,
  },
  strategyContainerStyle: { gap: 20, paddingBottom: 120, paddingHorizontal: 12 },
  protocalContainerStyle: { gap: 20, paddingBottom: 50 },
  recentContainerStyle: { gap: 10, paddingBottom: 0, paddingHorizontal: 12 },
  searchModalWrapper: { paddingHorizontal: 12, paddingBottom: 10 },
  discoverTopWrapper: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, paddingVertical: 10 },
});
