interface ILiquidityManagement {
  id: string;
  type: 'stake' | 'unstake';
}

interface IPairDetails {
  condition: 'stable' | 'volatile';
  tokenAIconURL: string;
  tokenBIconURL: string;
  tokenATitle: string;
  tokenBTitle: string;
}
