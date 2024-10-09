interface IPoolDetail {
  poolId: string;
}

interface IPool {
  id: string;
  primaryIconURL: string;
  secondaryIconURL: string;
  primaryTitle: string;
  secondaryTitle: string;
  primaryBalance: number;
  secondaryBalance: number;
  primaryUSDValue: number;
  secondaryUSDValue: number;
  condition: 'stable' | 'volatile';
  fee: number;
  aero: number;
  stakedAero: number;
  availableAero: number;
}

type Metric = 'tvl' | 'volume' | 'fees';

type PeriodText = 'past day' | 'past week' | 'past month' | 'past year';
type PeriodValue = '1d' | '1w' | '1m' | '1y';
type Period = {
  text: PeriodText;
  value: PeriodValue;
};
