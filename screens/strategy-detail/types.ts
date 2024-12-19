interface IStatCard {
  title?: string;
  variant: 'locked' | 'risk' | 'deposit' | 'curator';
  value: string;
  isActive: boolean;
}
