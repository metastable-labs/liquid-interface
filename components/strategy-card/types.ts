export interface IStrategyCard {
  strategy: any;
  navigationVariant?: 'primary' | 'secondary';
  actionTvl?: () => void;
}
