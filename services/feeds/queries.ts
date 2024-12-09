import { useInfiniteQuery, useQuery, useMutation } from '@tanstack/react-query';

import { fetchFeed, fetchFeeds } from './apis';

const useFeeds = () => {
  return useInfiniteQuery({
    queryKey: ['feeds'],
    queryFn: ({ pageParam }) => fetchFeeds(pageParam),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
    initialPageParam: '',
  });
};

const useFeed = (strategyId: string) => {
  return useQuery({
    queryKey: ['feedDetail', strategyId],
    queryFn: () => fetchFeed(strategyId),
    enabled: !!strategyId,
  });
};

const usePodtStrategy = (body: StrategyBody) => {};

export { useFeeds, useFeed };
