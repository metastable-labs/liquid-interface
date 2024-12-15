import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchComments } from './apis';

const useComments = (strategyId: string) => {
  return useInfiniteQuery({
    queryKey: ['comments'],
    queryFn: ({ pageParam }) => fetchComments(strategyId, pageParam),
    getNextPageParam: (lastPage) => (lastPage.pagination.hasMore ? lastPage.pagination.nextCursor : undefined),
    initialPageParam: '',
  });
};

export { useComments };
