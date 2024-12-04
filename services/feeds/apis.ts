import { axiosInstance } from '@/init/axios';

const fetchFeeds = async (pageParam?: string, sort?: 'latest' | 'trending') => {
  return (
    await axiosInstance.get<Feeds>('feed', {
      params: {
        cursor: pageParam,
        limit: 10,
        sort,
      },
    })
  ).data;
};

const fetchFeed = async (strategyId: string) => {
  return (await axiosInstance.get<Strategy>(`strategies/:${strategyId}`)).data;
};

const commentOnAStrategy = async (strategyId: string, data: PostCommentBody) => {
  return (await axiosInstance.post<PostCommentResponse>(`strategies/${strategyId}/comments`, data)).data;
};

const likeAStrategy = async (strategyId: string) => {
  return (await axiosInstance.post<LikeStrategyResponse>(`strategies/${strategyId}/likes`)).data;
};

const unLikeAStrategy = async (strategyId: string) => {
  return (await axiosInstance.delete<LikeStrategyResponse>(`strategies/${strategyId}/likes`)).data;
};

export { fetchFeeds, fetchFeed, commentOnAStrategy, likeAStrategy, unLikeAStrategy };
