interface ILQDPoolPairCard {
  address: `0x${string}`;
  primaryIconURL: string;
  secondaryIconURL: string;
  symbol: string;
  increased: boolean;
  change: number;
  navigationVariant?: 'primary' | 'secondary';
}
