import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { adjustFontSizeForIOS, formatNumberWithSuffix } from '@/utils/helpers';
import { LQDBarChart } from '@/components';
import { generateData, metrics, periods } from './dummy';
import { ArrowDownIcon } from '@/assets/icons';

const adjustmentColors = ['#FF8896', '#88FF9C'];

const Chart = () => {
  const [metric, setMetric] = useState<Metric>('tvl');
  const [period, setPeriod] = useState<Period>({
    text: 'past month',
    value: '1m',
  });
  const [data, setData] = useState(generateData(period.value));

  const value = 13_400_000;
  const increased = false;
  const change = 4.45;

  useEffect(() => setData(generateData(period.value)), [period.value]);

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.adjustmentContainer}>
            <Text style={styles.adjustmentValue}>${formatNumberWithSuffix(value)}</Text>

            <View style={styles.adjustmentAndPeriod}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ transform: [{ rotate: increased ? '180deg' : '0deg' }] }}>
                  <ArrowDownIcon fill={adjustmentColors[+increased]} />
                </View>

                <Text style={[styles.adjustmentTexts, { color: adjustmentColors[+increased] }]}>{change.toFixed(2)}%</Text>
              </View>

              <Text style={[styles.adjustmentTexts, styles.periodText]}>{period.text}</Text>
            </View>
          </View>
          <View style={styles.metrics}>
            {metrics.map((m, index) => {
              const active = metric === m;

              return (
                <TouchableOpacity key={index} style={[styles.metric, active && styles.activeMetric]} onPress={() => setMetric(m)}>
                  <Text style={[styles.metricText, active && styles.activeMetricText, m === 'tvl' && { textTransform: 'uppercase' }]}>
                    {m}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <LQDBarChart data={data} period={period.value} />
      </View>

      <View style={styles.periods}>
        {periods.map(({ text, value }, index) => {
          const active = period.value === value;

          return (
            <TouchableOpacity key={index} style={[styles.period, active && styles.activePeriod]} onPress={() => setPeriod({ text, value })}>
              <Text style={[styles.periodValue, active && styles.activePeriodValue]}>{value}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 20,
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
    textTransform: 'capitalize',
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
