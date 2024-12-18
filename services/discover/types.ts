type FeedSearch = {
  data: Strategy[];
  pagination: {
    hasMore: boolean;
    nextCursor?: string;
  };
};
