interface ILiquidityManagement {
  id: string;
  type: 'stake' | 'unstake';
}

interface IPairDetails {
  condition: 'stable' | 'volatile';
  primaryIconURL: string;
  secondaryIconURL: string;
  primaryTitle: string;
  secondaryTitle: string;
}
