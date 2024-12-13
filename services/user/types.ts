type User = {
  username: string;
  walletAddress: string;
  avatar?: string;
  joinDate: string;
  metrics: {
    totalStrategies: number;
    totalDeposits: string;
    followersCount?: number;
    followingCount?: number;
  };
  socials: {
    twitter?: string;
    farcaster?: string;
  };
};

type UserStrategies = {
  items: {
    id: string;
    name: string;
    description: string;
    metrics: {
      tvl: string;
      depositorCount: number;
      likeCount: number;
    };
    createdAt: string;
    transactionHash: string;
  }[];
  nextCursor?: string;
  hasMore: boolean;
};

type UserDeposits = {
  items: {
    strategyId: string;
    strategyName: string;
    amount: string;
    status: 'active' | 'withdrawn';
    depositedAt: string;
    transactionHash: string;
  }[];
  nextCursor?: string;
  hasMore: boolean;
};

type UserLikes = {
  items: {
    strategyId: string;
    strategyName: string;
    likedAt: string;
    curator: {
      walletAddress: string;
      username: string;
    };
  }[];
  nextCursor?: string;
  hasMore: boolean;
};
