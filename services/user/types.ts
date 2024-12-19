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
  data: Strategy[];
  nextCursor?: string;
  hasMore: boolean;
};
