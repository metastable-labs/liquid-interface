import { QueryKey, useInfiniteQuery, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFeed, fetchFeeds, likeAStrategy } from './apis';
import { useLiquidity } from '@/hooks/useLiquid';
import { publicClient } from '@/init/client';
import { PublicClient } from 'viem';
import { isDev } from '@/constants/env';
import { useToastActions } from '@/store/toast/actions';
import { useState } from 'react';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import useAppActions from '@/store/app/actions';

const useFeeds = () => {
  return useInfiniteQuery({
    queryKey: ['feeds'],
    queryFn: ({ pageParam }) => fetchFeeds(pageParam),
    getNextPageParam: (lastPage) => (lastPage.pagination.hasMore ? lastPage.pagination.nextCursor : undefined),
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
  const { router } = useSystemFunctions();
  const { createStrategy } = useLiquidity(publicClient as PublicClient);
  const { showToast } = useToastActions();
  const { handleStrategyActions } = useAppActions();
  const [loading, setLoading] = useState(false);

  const postStrategy = async (data: StrategyBody) => {
    try {
      setLoading(true);
      await createStrategy(data);

      showToast({
        title: 'Strategy created!',
        description: "You've successfully created a strategy",
        variant: 'success',
      });

      handleStrategyActions([]);

      return router.replace('/(tabs)/home');
    } catch (error: any) {
      if (error.cause?.message && error.cause?.message.includes('Biometrics must be enabled')) {
        const alertTitle = 'Device not enrolled to FaceID';
        const alertMessage = isDev
          ? 'On the top menu bar, click on \nFeatures > Face ID > Enrolled'
          : 'Please enroll your device to FaceID on settings';

        return showToast({
          title: alertTitle,
          description: alertMessage,
          variant: 'error',
        });
      } else {
        return showToast({
          title: 'Failed to create strategy',
          description: "We couldn't create the strategy. Please try again later!",
          variant: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { postStrategy, loading };
};

const useLikeMutation = (strategyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likeAStrategy(strategyId),
    onMutate: async () => {
      const queryKey: any = ['feedDetail', strategyId];

      await queryClient.cancelQueries(queryKey);

      const previousFeed = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          isLiked: true,
          likesCount: oldData.likesCount + 1,
        };
      });

      return { previousFeed };
    },
    onError: (err, _, context) => {
      const queryKey = ['feedDetail', strategyId];
      if (context?.previousFeed) {
        queryClient.setQueryData(queryKey, context.previousFeed);
      }

      console.log('Error liking strategy:', err);
    },
    onSettled: () => {
      const queryKey: any = ['feedDetail', strategyId];
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export { useFeeds, useFeed, useWriteFeed, useLikeMutation };
