import { axiosInstance, setTokenHeader } from '@/init/axios';

const strategyBaseUrl = '/strategy/strategies';

const fetchFeeds = async (pageParam?: string, sort?: 'latest' | 'trending') => {
  await setTokenHeader(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MCIsImFkZHJlc3MiOiIweDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAiLCJpYXQiOjE3MzQxMTc5OTF9.qeL-tK0Yh6bMq8L7WrYakYpwUFqvBkv7XSoyTWBqMmY'
  );
  return (
    await axiosInstance.get<Feeds>(`${strategyBaseUrl}/feed`, {
      params: {
        cursor: pageParam,
        limit: 10,
        sort,
      },
    })
  ).data;
};

const fetchFeed = async (strategyId: string) => {
  return (await axiosInstance.get<Strategy>(`${strategyBaseUrl}/:${strategyId}`)).data;
};

const commentOnAStrategy = async (strategyId: string, data: PostCommentBody) => {
  return (await axiosInstance.post<PostCommentResponse>(`${strategyBaseUrl}/${strategyId}/comments`, data)).data;
};

const likeAStrategy = async (strategyId: string) => {
  return (await axiosInstance.post<LikeStrategyResponse>(`${strategyBaseUrl}/${strategyId}/likes`)).data;
};

const unLikeAStrategy = async (strategyId: string) => {
  return (await axiosInstance.delete<LikeStrategyResponse>(`${strategyBaseUrl}/${strategyId}/likes`)).data;
};

export { fetchFeeds, fetchFeed, commentOnAStrategy, likeAStrategy, unLikeAStrategy };
