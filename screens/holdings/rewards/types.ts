type RewardCardCondition = 'stable' | 'volatile';
type RewardCardVariant = 'fees' | 'aero';

interface IRewardCard {
  id: string;
  condition: RewardCardCondition;
  variant: RewardCardVariant;
  primaryIconURL: string;
  secondaryIconURL: string;
  primaryTitle: string;
  secondaryTitle: string;
  fee: number;
  aero?: number;
  fees?: {
    primaryName: string;
    primaryValue: number;
    secondaryName: string;
    secondaryValue: number;
  };
}
