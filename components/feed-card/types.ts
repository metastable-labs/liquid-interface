interface FeedCard {
  feed: any; // Fix when we start pulling feeds data;
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
