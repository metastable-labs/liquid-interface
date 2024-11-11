interface PoolID {
  poolId: string;
}

interface PoolDetails {
  tokenAIconURL: string;
  tokenBIconURL: string;
  tokenATitle: string;
  tokenBTitle: string;
  tokenABalance: number;
  tokenBBalance: number;
  tokenAUSDValue: number;
  tokenBUSDValue: number;
  condition: 'stable' | 'volatile';
  fee: number;
  symbol: string;
  volume: number;
  tvl: number;
}

interface Stat {
  fee: number;
  volume: number;
  tvl: number;
}

type Metric = 'tvl' | 'volume' | 'fees';

type PeriodText = 'past day' | 'past week' | 'past month' | 'past year';
type PeriodValue = '1d' | '1w' | '1m' | '1y';
type Period = {
  text: PeriodText;
  value: PeriodValue;
};
