import { useInfiniteQuery, useQuery, useMutation } from '@tanstack/react-query';

import { fetchFeed, fetchFeeds } from './apis';
import { useLiquidity } from '@/hooks/useLiquid';
import { publicClient } from '@/init/client';
import { PublicClient } from 'viem';

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

const useWriteFeed = () => {
  const { createStrategy } = useLiquidity(publicClient as PublicClient);

  const postStrategy = async () => {
    try {
      const data: StrategyBody = {
        name: 'MoonPie',
        description: 'This is a test strategy',
        minDeposit: 1000,
        maxTvl: 1000000,
        performanceFee: 0.2,
        steps: [
          {
            connector: '0x01249b37d803573c071186BC4C3ea92872B93F5E',
            actionType: ActionType.SUPPLY,
            assetsIn: '',
            amountRatio: 5000,
            assetsOut: '',
            data: '0x',
          },
        ],
      };

      const response = await createStrategy(data);
      console.log(response);
    } catch (error) {
      //
    }
  };

  return { postStrategy };
};

export { useFeeds, useFeed, useWriteFeed };
