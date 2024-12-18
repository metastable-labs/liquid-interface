import { strategyAxiosInstance } from '@/init/axios';

const searchFeed = async (q?: string, cursor?: string, maxTvl?: string, minTvl?: string, assets?: string[], protocols?: string[]) => {
  return (
    await strategyAxiosInstance.get<FeedSearch>(`search`, {
      params: {
        q,
        cursor,
        limit: 20,
        minTvl,
        maxTvl,
        assets,
        protocols,
      },
    })
  ).data;
};

export { searchFeed };
