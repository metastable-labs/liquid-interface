import { QueryKey, useInfiniteQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { searchFeed } from './apis';

const useSearchFeeds = (q?: string, cursor?: string, minTvl?: string, maxTvl?: string, assets?: string[], protocols?: string[]) => {
  return useInfiniteQuery({
    queryKey: ['searchFeeds', q, cursor, minTvl, maxTvl, assets, protocols],
    queryFn: () => searchFeed(q, cursor, minTvl, maxTvl, assets, protocols),
    getNextPageParam: (lastPage) => (lastPage.pagination.hasMore ? lastPage.pagination.nextCursor : undefined),
    initialPageParam: '',
  });
};

export { useSearchFeeds };
