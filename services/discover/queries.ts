import { QueryKey, useInfiniteQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { searchFeed } from './apis';

const useSearchFeeds = (query?: string, pageParam?: string, minTvl?: string, maxTvl?: string, assets?: string[], protocols?: string[]) => {
  return useInfiniteQuery({
    queryKey: ['searchFeeds', query, pageParam, minTvl, maxTvl, assets, protocols],
    queryFn: () => searchFeed(query, pageParam, minTvl, maxTvl, assets, protocols),
    getNextPageParam: (lastPage) => (lastPage.pagination.hasMore ? lastPage.pagination.nextCursor : undefined),
    initialPageParam: '',
  });
};

export { useSearchFeeds };
