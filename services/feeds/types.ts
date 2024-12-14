type Feeds = {
  strategies: Strategy[];
  nextCursor?: string;
  hasMore: boolean;
};

type Strategy = {
  id: string;
  name: string;
  onchainId: number;
  curatorAddress: string;
  description: string;
  minDeposit: number;
  maxTvl: number;
  performanceFee: number;
  steps: StrategyStep[];
  metrics: {
    tvl: string;
    repostCount: number;
    likeCount: number;
    commentCount: number;
    apy: number;
    totalDepositAmount: string;
  };
  assets: {
    addresses: `0x${string}`[];
    count: number;
  };
  userInteraction: {
    hasLiked: boolean;
    deposit: {
      amount: number;
    };
  };
  createdAt: string;
  transactionHash: `0x${string}`;
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

type StrategyStep = {
  id: string;
  stepIndex: number;
  protocolAddress: `0x${string}`;
  actionType: 'supply' | 'withdraw' | 'borrow' | 'repay' | 'stake' | 'unstake' | 'swap' | 'claim';
  assetIn: `0x${string}`;
  assetOut: `0x${string}`[];
  amountRatio: number;
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
  minDeposit: bigint;
  maxTvl: bigint;
  performanceFee: bigint;
  steps: {
    connector: `0x${string}`;
    actionType: ActionType;
    assetsIn: `0x${string}`[];
    assetOut: `0x${string}`;
    amountRatio: bigint;
    data: `0x${string}`;
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
