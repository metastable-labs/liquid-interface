interface ILQDPoolPairPaper {
  address: `0x${string}`;
  primaryIconURL: string;
  secondaryIconURL: string;
  symbol: string;
  apr: number;
  fees: number;
  capitalMetric?: 'vol' | 'tvl';
  volume: number;
  navigationVariant?: 'primary' | 'secondary';
  isStable: boolean;
}
