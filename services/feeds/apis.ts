import { strategyAxiosInstance, setStrategyTokenHeader } from '@/init/axios';

const fetchFeeds = async (pageParam?: string, sort?: 'latest' | 'trending') => {
  await setStrategyTokenHeader(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MCIsImFkZHJlc3MiOiIweDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4OTAiLCJpYXQiOjE3MzQxMTc5OTF9.qeL-tK0Yh6bMq8L7WrYakYpwUFqvBkv7XSoyTWBqMmY'
  );
  return (
    await strategyAxiosInstance.get<Feeds>(`feed`, {
      params: {
        cursor: pageParam,
        limit: 10,
        sort,
      },
    })
  ).data;
};

const fetchFeed = async (strategyId: string) => {
  return (await strategyAxiosInstance.get<Strategy>(`${strategyId}`)).data;
};

const likeAStrategy = async (strategyId: string) => {
  return (await strategyAxiosInstance.post<LikeStrategyResponse>(`${strategyId}/likes`)).data;
};

const unLikeAStrategy = async (strategyId: string) => {
  return (await strategyAxiosInstance.delete<LikeStrategyResponse>(`${strategyId}/likes`)).data;
};

export { fetchFeeds, fetchFeed, likeAStrategy, unLikeAStrategy };
