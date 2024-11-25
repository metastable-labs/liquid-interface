import { View, StyleSheet } from 'react-native';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';

import { adjustFontSizeForIOS, formatNumberWithSuffix } from '@/utils/helpers';

const LQDBarChart = ({ data }: ILQDBarChart) => {
  const getXAxisLabels = () => {
    return data.map((d) => d.dateFormat);
  };

  return (
    <View style={styles.wrapper}>
      <VictoryChart
        key={`chart-${Math.random()}-${data.length}`}
        theme={VictoryTheme.material}
        domainPadding={12}
        height={315}
        animate={{ duration: 500 }}
      >
        <VictoryAxis
          key={`x-axis-${data.length}`}
          animate={false}
          tickValues={data.map((_, i) => i + 1)}
          tickFormat={getXAxisLabels()}
          style={{
            axis: { stroke: '#F2F4F7' },
            ticks: { stroke: 'none' },
            grid: {
              stroke: 'none',
              strokeDasharray: 'none',
            },
            tickLabels: {
              fontSize: adjustFontSizeForIOS(12, 2),
              lineHeight: 15.84,
              fontFamily: 'AeonikRegular',
              fill: '#475569',
              textAnchor: 'middle',
              // angle: period === '1d' || period === '1y' ? -45 : 0,
            },
          }}
        />

        <VictoryAxis
          dependentAxis
          animate={false}
          key={`y-axis-${data.length}`}
          style={{
            axis: { stroke: 'none' },
            ticks: { stroke: 'none' },
            grid: {
              stroke: '#F2F4F7',
              strokeDasharray: 'none',
            },
            tickLabels: {
              fontSize: adjustFontSizeForIOS(12, 2),
              lineHeight: 15.84,
              fontFamily: 'AeonikRegular',
              fill: '#475569',
              textAnchor: 'end',
            },
          }}
          tickFormat={(t) => formatNumberWithSuffix(t)}
        />

        <VictoryBar
          data={data}
          x="date"
          y="value"
          barWidth={16}
          style={{
            data: {
              fill: '#898B82',
              stroke: 'none',
              borderRadius: 6,
            },
          }}
          cornerRadius={{ top: 5 }}
        />
      </VictoryChart>
    </View>
  );
};

export default LQDBarChart;

const styles = StyleSheet.create({
  wrapper: {
    height: 315,
  },
});
