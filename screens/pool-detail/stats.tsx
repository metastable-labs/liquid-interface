import { View, Text, StyleSheet } from 'react-native';

import { adjustFontSizeForIOS, formatNumberWithSuffix } from '@/utils/helpers';
import { Chart2AltIcon, CoinsLGIcon, MoneyTickIcon, SwapHorizontalIcon } from '@/assets/icons';

const PoolStats = ({ volume, fee, tvl }: Stat) => {
  const stats = [
    {
      title: 'Volume',
      value: `$${formatNumberWithSuffix(volume)}`,
      icon: <Chart2AltIcon />,
    },
    {
      title: 'TVL',
      value: `$${formatNumberWithSuffix(tvl)}`,
      icon: <MoneyTickIcon />,
    },
    {
      title: 'Fees',
      value: `$${formatNumberWithSuffix(fee)}`,
      icon: <CoinsLGIcon width={20} height={20} />,
    },
    {
      title: 'Transactions',
      value: `${(194).toLocaleString()} TX`,
      icon: <SwapHorizontalIcon />,
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
              <Text style={styles.metric}>{title} </Text>
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
    fontSize: adjustFontSizeForIOS(16, 2),
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
    fontSize: adjustFontSizeForIOS(15, 2),
    lineHeight: 19.8,
  },
});
