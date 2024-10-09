import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { formatNumberWithSuffix } from '@/utils/helpers';

const PoolStats = () => {
  const stats = [
    {
      title: 'Volume',
      value: `$${formatNumberWithSuffix(607_000)}`,
      icon: <Ionicons name="cash" size={20} color="#64748B" />,
    },
    {
      title: 'TVL',
      value: `$${formatNumberWithSuffix(1_300_000)}`,
      icon: <Ionicons name="cloud-outline" size={20} color="#64748B" />,
    },
    {
      title: 'Fees',
      value: `$${formatNumberWithSuffix(24_400)}`,
      icon: <Ionicons name="stats-chart" size={20} color="#64748B" />,
    },
    {
      title: 'Transactions',
      value: `${(194).toLocaleString()} TX`,
      icon: <Ionicons name="swap-horizontal" size={20} color="#64748B" />,
    },
  ];

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Pool stats</Text>

      <View style={styles.container}>
        {stats.map(({ title, value, icon }) => (
          <View key={title} style={styles.stat}>
            <View style={styles.metricContainer}>
              {icon}
              <Text style={styles.metric}>{title} (24hrs)</Text>
            </View>
            <Text style={styles.title}>{value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PoolStats;

const styles = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    gap: 24,
  },

  title: {
    color: '#1A2001',
    fontSize: 16,
    lineHeight: 19.2,
    fontWeight: '500',
    fontFamily: 'AeonikMedium',
  },

  container: {
    alignSelf: 'stretch',
    gap: 32,
  },

  stat: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  metricContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  metric: {
    color: '#64748B',
    fontSize: 15,
    lineHeight: 19.8,
  },
});
