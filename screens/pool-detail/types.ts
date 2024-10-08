interface IPoolDetail {
  poolId: string;
}

interface IPool {
  id: string;
  primaryIconURL: string;
  secondaryIconURL: string;
  primaryTitle: string;
  secondaryTitle: string;
  condition: 'stable' | 'volatile';
  fee: number;
}

type Metric = 'tvl' | 'volume' | 'fees';

type PeriodText = 'past day' | 'past week' | 'past month' | 'past year';
type PeriodValue = '1d' | '1w' | '1m' | '1y';
type Period = {
  text: PeriodText;
  value: PeriodValue;
};
