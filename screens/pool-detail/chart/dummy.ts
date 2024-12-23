import { Pool } from '@/store/pools/types';

type HistoricalData = 'm5' | 'h1' | 'h6' | 'h24';

const generateData = (selectedPool?: Pool): Array<BarData> => {
  if (!selectedPool?.historicalVolumeUSD) return [];

  const data: BarData[] = [];
  const historicalData = selectedPool?.historicalVolumeUSD;

  const now = new Date();

  const intervals = {
    m5: 5 * 60 * 1000, // 5 minutes
    h1: 1 * 60 * 60 * 1000, // 1 hour
    h6: 6 * 60 * 60 * 1000, // 6 hours
    h24: 24 * 60 * 60 * 1000, // 24 hours
  };

  Object.keys(historicalData).forEach((key) => {
    const value = historicalData[key as HistoricalData];
    const date = new Date(now.getTime() - intervals[key as HistoricalData]);
    let dateFormat = '';

    if (key === 'm5') {
      dateFormat = '5mins';
    } else if (key === 'h1') {
      dateFormat = '1hr';
    } else if (key === 'h6') {
      dateFormat = '6hrs';
    } else if (key === 'h24') {
      dateFormat = '24hrs';
    }

    data.push({ date: date.toISOString(), value: Math.round(value), type: key as HistoricalData, dateFormat });
  });

  return data;
};

export { generateData, HistoricalData };
