import { StyleSheet, View, Text, FlatList } from 'react-native';
import React from 'react';
import { LQDFlatlist, LQDImage } from '@/components';
import { SearchBar } from 'react-native-screens';
import { ArrowCircleDownIcon, SearchIcon } from '@/assets/icons';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import RecentCard from '@/components/search-ui/recent-card';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const Discover = () => {
  const { router, poolsState, dispatch } = useSystemFunctions();
  const recentSearch = poolsState.recentSearchedPools;
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, paddingVertical: 10 }}>
        <Text style={styles.topText}>Discover</Text>
        <View style={styles.topIconWrapper}>
          <View style={styles.relativeWrapper}>
            <LQDImage height={28} width={28} />
            <View style={styles.dropIcon}>
              <ArrowCircleDownIcon />
            </View>
          </View>
          <View style={styles.relativeWrapper}>
            <LQDImage height={28} width={28} />
            <View style={styles.dropIcon}>
              <ArrowCircleDownIcon />
            </View>
          </View>
          <View style={styles.relativeWrapper}>
            <LQDImage height={28} width={28} />
            <View style={styles.dropIcon}>
              <ArrowCircleDownIcon />
            </View>
          </View>
          <SearchIcon />
        </View>
      </View>

      <View>
        <LQDFlatlist
          data={recentSearch}
          horizontal
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <RecentCard pool={item} />}
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 20, marginBottom: 10 }}
          contentContainerStyle={{ gap: 10, paddingBottom: 0, paddingHorizontal: 16 }}
        />
      </View>
      {/* <View st> */}
      <LQDFlatlist
        data={recentSearch}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <RecentCard pool={item} />}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        style={{ paddingTop: 20 }}
        contentContainerStyle={{ gap: 10, paddingBottom: 0, paddingHorizontal: 16 }}
      />
      {/* </View> */}
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
  dropIcon: { position: 'absolute', bottom: 1, right: 0 },
  relativeWrapper: { position: 'relative' },
});
