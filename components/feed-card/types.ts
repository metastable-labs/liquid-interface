interface FeedCard {
  feed: any;
  showInvest?: boolean;
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
