interface FeedCard {
  feed: any;
}

interface IFeedStep {
  title: string;
  variant: 'supply' | 'borrow' | 'deposit' | 'stake';
  tokenA: string;
  tokenB: string;
  tokenAIconURL: string;
  tokenBIconURL: string;
  isLast?: boolean;
}
