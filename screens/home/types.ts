interface ISection {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  icon: React.ReactElement;
  action?: () => void;
  isShowingAll?: boolean;
}

interface IGainers {
  primaryIconURL: string;
  secondaryIconURL: string;
  primaryTitle: string;
  secondaryTitle: string;
  increased: boolean;
  change: number;
}

interface IPoolPair {
  primaryIconURL: string;
  secondaryIconURL: string;
  primaryTitle: string;
  secondaryTitle: string;
  apr: number;
  fees: number;
  capitalMetric?: 'vol' | 'tvl';
  capital: number;
}
