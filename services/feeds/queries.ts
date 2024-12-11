import { useInfiniteQuery, useQuery, useMutation } from '@tanstack/react-query';

import { fetchFeed, fetchFeeds } from './apis';
import { useLiquidity } from '@/hooks/useLiquid';
import { publicClient } from '@/init/client';
import { PublicClient } from 'viem';
import { isDev } from '@/constants/env';
import { useToastActions } from '@/store/toast/actions';

const SUPPLY = 0; // Supply assets
const WITHDRAW = 1; // Withdraw assets
const BORROW = 2; // Borrow assets
const REPAY = 3; // Repay debt
const STAKE = 4; // Stake assets
const UNSTAKE = 5; // Unstake assets
const SWAP = 6; // Swap assets
const CLAIM = 7; // Claim rewards

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
  const { showToast } = useToastActions();

  const postStrategy = async () => {
    try {
      const data: StrategyBody = {
        name: 'MoonPiewkgkg',
        description: 'This is a test strategy',
        minDeposit: BigInt(1000),
        maxTvl: BigInt(1000000),
        performanceFee: BigInt(20),
        steps: [
          {
            connector: '0x01249b37d803573c071186BC4C3ea92872B93F5E',
            actionType: SUPPLY,
            assetsIn: ['0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf'],
            amountRatio: BigInt(5000),
            assetOut: '0xF877ACaFA28c19b96727966690b2f44d35aD5976',
            data: '0x',
          },
          {
            connector: '0x01249b37d803573c071186BC4C3ea92872B93F5E',
            actionType: BORROW,
            assetsIn: ['0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf'],
            amountRatio: BigInt(5000),
            assetOut: '0xF877ACaFA28c19b96727966690b2f44d35aD5976',
            data: '0x',
          },
        ],
      };

      const response = await createStrategy(data);
      console.log(response);
    } catch (error: any) {
      console.log(error);
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
    }
  };

  return { postStrategy };
};

export { useFeeds, useFeed, useWriteFeed };
