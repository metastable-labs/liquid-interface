import { strategyAxiosInstance } from '@/init/axios';

const fetchComments = async (strategyId: string, pageParam?: string) => {
  return (
    await strategyAxiosInstance.get<Comments>(`$${strategyId}/comments`, {
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

export { fetchComments, commentOnAStrategy };
