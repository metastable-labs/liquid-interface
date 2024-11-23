import { View, Text, StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import React from 'react';
import { LQShrimeLoader } from '@/components';
import { createArrayWithIndexes } from '@/utils/helpers';

const Loader = () => {
  const emptyArryTopGainers = createArrayWithIndexes(3);
  const emptyArryTrending = createArrayWithIndexes(5);
  return (
    <View style={styles.loaderBody}>
      {/* search */}
      <View style={styles.searchLoader}>
        <LQShrimeLoader style={styles.loaderOne} />
        <LQShrimeLoader style={styles.loaderTwo} />
        <LQShrimeLoader style={styles.loaderOne} />
      </View>

      {/* total balance */}
      <LQShrimeLoader style={styles.loaderBalance} />

      {/* button */}
      <LQShrimeLoader style={styles.loaderButton} />

      {/* section */}
      <View style={styles.sectionContainer}>
        <LQShrimeLoader style={styles.sectionLoaderOne} />
        <LQShrimeLoader style={styles.sectionLoaderTwo} />
      </View>

      {/* gainers */}
      <View style={styles.gainerLoaderContainer}>
        {emptyArryTopGainers.map((_, index) => (
          <LQShrimeLoader key={index} style={styles.gainerLoader} />
        ))}
      </View>

      {/* section */}
      <View style={styles.sectionContainer}>
        <LQShrimeLoader style={styles.sectionLoaderOne} />
        <LQShrimeLoader style={styles.sectionLoaderTwo} />
      </View>

      {/* trending */}
      {emptyArryTrending.map((_, index) => (
        <View key={index} style={styles.loaderContainer}>
          <LQShrimeLoader style={styles.topGainerLoaderOne} />
          <View style={styles.loaderCenterContainer}>
            <LQShrimeLoader style={styles.topGainerLoaderTwo} />
            <LQShrimeLoader style={styles.topGainerLoaderThree} />
          </View>
          <LQShrimeLoader style={styles.topGainerLoaderFour} />
        </View>
      ))}
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loaderButton: { height: 40, borderRadius: 10, marginTop: 20 },
  loaderBalance: { height: 98, borderRadius: 10, marginTop: 30 },
  searchLoader: {
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 20,
    paddingBottom: Platform.OS === 'android' ? -(RNStatusBar.currentHeight || 0) : -48,
  },
  loaderOne: { height: 24, width: 24, borderRadius: 16 },
  loaderTwo: { height: 35, width: 50, borderRadius: 6, flex: 1 },
  header: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionLoaderOne: { height: 20, width: '40%', borderRadius: 6 },
  sectionLoaderTwo: { height: 20, width: 56, borderRadius: 6 },
  gainerLoader: { height: 90, width: 140, borderRadius: 6, marginBottom: 20 },

  // loader
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 30,
  },

  loaderCenterContainer: { flex: 1, gap: 5 },

  topGainerLoaderOne: { height: 45, width: 45, borderRadius: 100 },
  topGainerLoaderTwo: { height: 15, width: '40%', borderRadius: 6 },
  topGainerLoaderThree: { height: 15, width: '50%', borderRadius: 6 },
  topGainerLoaderFour: { height: 15, width: 56, borderRadius: 6 },
  gainerLoaderContainer: { flexDirection: 'row', gap: 20, marginTop: 20 },
  sectionContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  loaderBody: { backgroundColor: '#fff', flex: 1, paddingHorizontal: 16 },
});
