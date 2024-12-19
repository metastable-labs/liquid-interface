import { strategyAxiosInstance } from '@/init/axios';

const fetchComments = async (strategyId: string, pageParam?: string) => {
  return (
    await strategyAxiosInstance.get<Comments>(`${strategyId}/comments`, {
      params: {
        cursor: pageParam,
        limit: 10,
      },
    })
  ).data;
};

const commentOnAStrategy = async (strategyId: string, data: PostCommentBody) => {
  return (await strategyAxiosInstance.post(`${strategyId}/comments`, data)).data;
};

const likeCommentOnAStrategy = async (comment: string) => {
  return (await strategyAxiosInstance.post<LikeStrategyResponse>(`comments/${comment}/like`)).data;
};

export { fetchComments, commentOnAStrategy, likeCommentOnAStrategy };
