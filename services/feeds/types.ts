type Feeds = {
  data: Strategy[];
  pagination: {
    hasMore: boolean;
    nextCursor?: string;
  };
};

type Strategy = {
  id: string;
  name: string;
  onchainId: number;
  description: string;
  curator: {
    address: `0x${string}`;
    username: string;
    avatarUrl: string;
  };
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

type StrategyStep = {
  id: string;
  stepIndex: number;
  protocolAddress: `0x${string}`;
  actionType: 'supply' | 'borrow' | 'stake' | 'deposit' | 'swap';
  assetInToken: {
    address: `0x${string}`;
    symbol: string;
    logoUrl: string;
  };
  assetOutTokens: {
    address: `0x${string}`;
    symbol: string;
    logoUrl: string;
  }[];
  amountRatio: number;
  blockNumber: string;
  transactionHash: `0x${string}`;
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
