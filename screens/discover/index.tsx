import { StyleSheet, View, Text, StatusBar as RNStatusBar, Pressable, Platform } from 'react-native';
import React, { useCallback, useState } from 'react';
import { LQDBottomSheet, LQDButton, LQDFlatlist, LQDImage, LQDInput, LQDStrategyCard, SearchUI } from '@/components';
import { SearchBar } from 'react-native-screens';
import { ArrowCircleDownIcon, SearchIcon } from '@/assets/icons';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import RecentCard from '@/components/search-ui/popular-asset-card';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { strategyies } from './dummy';
import { useForm } from 'react-hook-form';
import PercentageSetter from '../liquidity-actions/remove/percentage-setter';
import useAppActions from '@/store/app/actions';

const Discover = () => {
  const { router, poolsState, dispatch, appState } = useSystemFunctions();
  const [search, setSearch] = useState(false);
  const [showTvl, setShowTvl] = useState(false);
  const [percentage, setPercentage] = useState(25);

  const stableSetPercentage = useCallback((value: number) => setPercentage(value), []);
  const recentSearch = poolsState.recentSearchedPools;
  const { control, watch } = useForm();

  const closeInput = () => {
    setSearch((prev) => !prev);
  };

  const openTvl = () => {
    setShowTvl((prev) => !prev);
  };

  if (appState.showSearch) {
    return (
      <View style={styles.searchWrapper}>
        <SearchUI />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!search && (
        <View style={styles.discoverTopWrapper}>
          <Text style={styles.topText}>Discover</Text>
          <View style={styles.topIconWrapper}>
            <View style={styles.relativeWrapper}>
              <LQDImage height={30} width={30} />
              <View style={styles.dropIcon}>
                <ArrowCircleDownIcon />
              </View>
            </View>
            <View style={styles.relativeWrapper}>
              <LQDImage height={30} width={30} />
              <View style={styles.dropIcon}>
                <ArrowCircleDownIcon />
              </View>
            </View>
            <Pressable style={styles.relativeWrapper}>
              <LQDImage height={30} width={30} />
              <View style={styles.dropIcon}>
                <ArrowCircleDownIcon />
              </View>
            </Pressable>
            <Pressable onPress={closeInput}>
              <SearchIcon />
            </Pressable>
          </View>
        </View>
      )}
      {search && (
        <View style={styles.searchModalWrapper}>
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
            iconAction={closeInput}
          />
        </View>
      )}

      <View>
        <LQDFlatlist
          data={recentSearch}
          horizontal
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <RecentCard pool={item} />}
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 20, marginBottom: 10 }}
          contentContainerStyle={styles.recentContainerStyle}
        />
      </View>
      <LQDFlatlist
        data={strategyies}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <LQDStrategyCard strategy={item} actionTvl={openTvl} />}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        style={{ paddingTop: 15 }}
        contentContainerStyle={styles.strategyContainerStyle}
      />

      <LQDBottomSheet show={showTvl} title="TVL" variant="primary" onClose={openTvl}>
        <View style={styles.percentageSetterContainer}>
          <PercentageSetter setPercentage={stableSetPercentage} />
        </View>

        <LQDButton variant="secondary" title="Continue" />
      </LQDBottomSheet>
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
  recentContainerStyle: { gap: 10, paddingBottom: 0, paddingHorizontal: 12 },
  searchModalWrapper: { paddingHorizontal: 12 },
  discoverTopWrapper: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, paddingVertical: 10 },
});
