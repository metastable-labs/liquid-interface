import { View, StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import React from 'react';
import { LQShrimeLoader } from '@/components';
import { createArrayWithIndexes } from '@/utils/helpers';

const Loader = () => {
  const emptyArry = createArrayWithIndexes(3);
  return (
    <View style={styles.container}>
      {emptyArry.map((_, index) => (
        <View key={index} style={styles.loaderBody}>
          <View style={styles.searchLoader}>
            <LQShrimeLoader style={styles.loaderOne} />
            <LQShrimeLoader style={styles.loaderTwo} />
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <LQShrimeLoader style={styles.loaderThree} />
            </View>
          </View>

          <LQShrimeLoader style={styles.loaderBalance} />

          <View style={styles.sectionContainer}>
            <LQShrimeLoader style={styles.sectionLoaderOne} />
            <LQShrimeLoader style={styles.sectionLoaderOne} />
          </View>

          <LQShrimeLoader style={styles.loaderButton} />
          <LQShrimeLoader style={[styles.loaderButton, { height: 25 }]} />
        </View>
      ))}
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', flex: 1 },
  loaderBody: { borderBottomWidth: 1, paddingBottom: 30, borderColor: '#F1F5F9', paddingHorizontal: 16 },
  loaderButton: { height: 40, borderRadius: 10, marginTop: 20 },
  loaderBalance: { height: 98, borderRadius: 10, marginTop: 20 },
  searchLoader: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 20,
  },
  loaderOne: { height: 40, width: 40, borderRadius: 100 },
  loaderTwo: { height: 40, width: 50, borderRadius: 10, flex: 1 },
  loaderThree: { height: 25, width: 24, borderRadius: 100 },
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
  sectionContainer: { justifyContent: 'space-between', marginTop: 20, gap: 10 },
});
