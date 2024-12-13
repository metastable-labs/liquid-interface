interface FeedCard {
  feed: any;
  onPressComment?: () => void;
  onPressInvest?: () => void;
  onPressShare?: () => void;
  onPressLike?: () => void;
  onNavigate?: () => void;
}

interface IFeedStep {
  title?: string;
  variant: 'supply' | 'borrow' | 'deposit' | 'stake';
  token: string;
  protocolTitle: string;
  tokenIconURL: string;
  protocolIcon: 'moonwell' | 'aerodrome' | 'morpho';
  isLast?: boolean;
}
