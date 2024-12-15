interface FeedCard {
  feed: Strategy;
  onNavigate?: () => void;
  handleCommentPress?: () => void;
  isDetailPage?: boolean;
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
