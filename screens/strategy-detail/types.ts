interface IStatCard {
  title?: string;
  variant: 'locked' | 'risk' | 'deposit' | 'curator';
  value: string;
  isActive: boolean;
}

interface Percentage {
  setPercentage?: (percentage: number) => void;
  amount: number;
  balance: number;
}
