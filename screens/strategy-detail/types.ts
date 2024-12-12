interface IStatCard {
  title?: string;
  variant: 'locked' | 'risk' | 'deposit' | 'curator';
  value: string;
  isActive: boolean;
}

interface Comment {
  image: string;
  username: string;
  content: string;
  likes: string;
  date: string;
}

interface ICommentCard {
  comment: Comment;
}
