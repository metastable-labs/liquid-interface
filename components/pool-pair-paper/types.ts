interface ILQDPoolPairPaper {
  id: string;
  primaryIconURL: string;
  secondaryIconURL: string;
  primaryTitle: string;
  secondaryTitle: string;
  apr: number;
  fees: number;
  capitalMetric?: 'vol' | 'tvl';
  capital: number;
  navigationVariant?: 'primary' | 'secondary';
}
