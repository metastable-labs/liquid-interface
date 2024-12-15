type Comments = {
  data: CommentItem[];
  pagination: {
    nextCursor?: string;
    hasMore: boolean;
  };
};

type CommentItem = {
  id: string;
  content: string;
  createdAt: string;
  author: {
    address: string;
  };
  likeCount: number;
  isLiked: boolean;
  stategyId: string;
  replyToId: string;
  replies: string[];
};
