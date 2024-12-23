import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Pool } from '@/store/pools/types';
import { LQDPoolPairPaper } from '@/components';
import { adjustFontSizeForIOS } from '@/utils/helpers';
import { memo } from 'react';

const SelectPool = ({ pools }: { pools: Pool[] }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Pools</Text>

      <View style={styles.innerContainer}>
        {pools.map((pool, index) => (
          <TouchableOpacity onPress={() => {}} key={index} style={styles.wrapper}>
            <LQDPoolPairPaper key={index} pool={pool} showFullSymbol />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    paddingTop: 20,
  },

  innerContainer: {
    gap: 20,
  },

  wrapper: {
    borderRadius: 8,
    borderColor: '#EAEEF4',
    borderWidth: 1,
    padding: 16,
  },

  title: {
    color: '#0F172A',
    fontSize: adjustFontSizeForIOS(20, 3),
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
    paddingBottom: 14,
  },
});

export default memo(SelectPool);
