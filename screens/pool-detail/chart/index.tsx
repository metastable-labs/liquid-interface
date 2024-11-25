import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { adjustFontSizeForIOS, formatNumberWithSuffix } from '@/utils/helpers';
import { LQDBarChart } from '@/components';
import { generateData } from './dummy';
import { ArrowDownIcon } from '@/assets/icons';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const adjustmentColors = ['#FF8896', '#88FF9C'];

const Chart = () => {
  const { poolsState } = useSystemFunctions();
  const { selectedPool } = poolsState;

  const [data, setData] = useState(generateData(selectedPool));

  const value = selectedPool?.tvl || 0;

  useEffect(() => setData(generateData(selectedPool)), [selectedPool]);

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.adjustmentContainer}>
            <Text style={styles.adjustmentValue}>${formatNumberWithSuffix(value)}</Text>

            <Text style={[styles.adjustmentTexts, styles.periodText]}>TVL</Text>
          </View>
        </View>

        <LQDBarChart data={data} period={'1d'} />
      </View>

      <View style={styles.periods}>
        <Text style={[styles.periodValue, styles.activePeriodValue]}>VOLUME</Text>
      </View>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 16,
  },

  container: {
    alignSelf: 'stretch',
    gap: 36,
  },

  header: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  adjustmentContainer: {
    gap: 4,
  },

  adjustmentValue: {
    color: '#1A2001',
    fontSize: adjustFontSizeForIOS(36, 4),
    lineHeight: 40.32,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
    letterSpacing: -1,
    textTransform: 'uppercase',
  },

  adjustmentAndPeriod: {
    flexDirection: 'row',
    gap: 4,
  },

  adjustmentTexts: {
    fontSize: adjustFontSizeForIOS(13, 2),
    lineHeight: 16.12,
    fontFamily: 'AeonikRegular',
  },

  periodText: {
    color: '#64748B',
  },

  metrics: {
    flexDirection: 'row',
    gap: 18,
    alignItems: 'center',
  },

  metric: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeMetric: {
    backgroundColor: '#F8FAFC',
    borderRadius: 3,
  },

  metricText: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(14, 2),
    lineHeight: 18.48,
    fontFamily: 'AeonikRegular',
    textTransform: 'capitalize',
  },

  activeMetricText: {
    color: '#1E293B',
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  periods: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    flexDirection: 'row',
    gap: 28,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#EAEEF4',
    backgroundColor: '#FFF',
  },

  period: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activePeriod: {
    borderRadius: 3,
    backgroundColor: '#F1F5F9',
  },

  periodValue: {
    color: '#64748B',
    fontSize: adjustFontSizeForIOS(16, 2),
    lineHeight: 19.84,
    fontFamily: 'AeonikRegular',
    textTransform: 'uppercase',
  },

  activePeriodValue: {
    color: '#1E293B',
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },
});
