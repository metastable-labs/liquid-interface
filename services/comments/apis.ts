import { axiosInstance } from '@/init/axios';

const strategyBaseUrl = '/strategy/strategies';

const fetchComments = async (strategyId: string, pageParam?: string) => {
  return (
    await axiosInstance.get<Comments>(`${strategyBaseUrl}/${strategyId}/comments`, {
      params: {
        cursor: pageParam,
        limit: 10,
      },
    })
  ).data;
};

export { fetchComments };
