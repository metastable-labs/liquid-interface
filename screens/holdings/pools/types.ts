type PoolCardVariant = 'stable' | 'volatile';

interface IPoolCard {
  id: string;
  variant: PoolCardVariant;
  primaryIconURL: string;
  secondaryIconURL: string;
  primaryTitle: string;
  secondaryTitle: string;
  fees: number;
  lpBalance: number;
  stakedBalance: number;
}

interface IPoolCardAction {
  id: string;
  type: 'stake' | 'unstake';
  disabled: boolean;
}
