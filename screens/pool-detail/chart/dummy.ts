const metrics: Array<Metric> = ['tvl', 'volume', 'fees'];
const periods: Array<Period> = [
  { text: 'past day', value: '1d' },
  { text: 'past week', value: '1w' },
  { text: 'past month', value: '1m' },
  { text: 'past year', value: '1y' },
];

const generateData = (period: PeriodValue): Array<BarData> => {
  const data: BarData[] = [];
  const today = new Date();
  let value = 1_200_000;
  let startTime: Date;
  let interval: number;
  let totalIntervals: number;

  const varianceMap: Record<PeriodValue, number> = {
    '1d': 100_000,
    '1w': 200_000,
    '1m': 500_000,
    '1y': 1_000_000,
  };

  const variance = varianceMap[period];

  switch (period) {
    case '1d':
      startTime = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      interval = 60 * 60 * 1000;
      totalIntervals = 10;
      break;
    case '1w':
      startTime = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      interval = 24 * 60 * 60 * 1000;
      totalIntervals = 7;
      break;
    case '1m':
      startTime = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
      interval = 7 * 24 * 60 * 60 * 1000;
      totalIntervals = 5;
      break;
    case '1y':
      startTime = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
      interval = 30 * 24 * 60 * 60 * 1000;
      totalIntervals = 12;
      break;
    default:
      throw new Error("Invalid period. Choose from '1d', '1w', '1m', or '1y'");
  }

  for (let i = 0; i <= totalIntervals; i++) {
    const date = new Date(startTime.getTime() + i * interval);
    value += Math.random() * variance - variance / 2;

    // Ensure value is never negative
    value = Math.max(value, 0);

    data.push({ date: date.toISOString(), value: Math.round(value) });
  }

  return data;
};

export { metrics, periods, generateData };
