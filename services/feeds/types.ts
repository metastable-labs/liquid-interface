type Feeds = {
  strategies: Strategy[];
  nextCursor?: string;
  hasMore: boolean;
  metadata?: {
    totalStrategies: number;
    totalTvl: string;
    uniqueProtocols: number;
  };
};

type Strategy = {
  id: string;
  name: string;
  description: string;
  contractAddress: string;
  curator: {
    walletAddress: string;
    username: string;
    avatar?: string;
  };
  steps: {
    stepIndex: number;
    protocolAddress: string;
    actionType: 'supply' | 'withdraw' | 'borrow' | 'repay' | 'stake' | 'unstake' | 'swap' | 'claim';
    assetIn: string;
    assetOut?: string;
    amountRatio: number;
  }[];
  metrics: {
    tvl: string;
    repostCount: number;
    likeCount: number;
    commentCount: number;
    averageDeposit: string;
  };
  assets: {
    addresses: string[];
    count: number;
  };
  protocols: {
    addresses: string[];
    count: number;
    actionTypes: string[];
  };

  userInteraction?: {
    // Present if user is authenticated
    hasLiked: boolean;
    hasDeposited: boolean;
    depositAmount?: string;
  };
  createdAt: string;
  transactionHash: string;
};

type PostCommentBody = {
  content: string;
  replyToId?: string;
};

type PostCommentResponse = {
  id: string;
  content: string;
  author: {
    walletAddress: string;
    username: string;
    avatar?: string;
  };
  replyTo?: {
    id: string;
    author: {
      username: string;
    };
  };
  likeCount: number;
  createdAt: string;
};

type LikeStrategyResponse = {
  success: boolean;
  strategy: {
    id: string;
    likeCount: number;
  };
};

type StrategyBody = {
  name: string;
  description: string;
  minDeposit: number;
  maxTvl: number;
  performanceFee: number;
  steps: {
    connector: string;
    actionType: ActionType;
    assetsIn: string;
    assetsOut: string;
    amountRatio: number;
    data?: any;
  }[];
};

enum ActionType {
  SUPPLY, // Supply assets
  WITHDRAW, // Withdraw assets
  BORROW, // Borrow assets
  REPAY, // Repay debt
  STAKE, // Stake assets
  UNSTAKE, // Unstake assets
  SWAP, // Swap assets
  CLAIM, // Claim rewards
}
