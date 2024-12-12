interface FeedCard {
  feed: any;
  showInvest?: boolean;
  showComment?: () => void;
}

interface IFeedStep {
  title?: string;
  variant: 'supply' | 'borrow' | 'deposit' | 'stake';
  tokenA: string;
  tokenB: string;
  tokenAIconURL: string;
  tokenBIconURL: string;
  isLast?: boolean;
}
