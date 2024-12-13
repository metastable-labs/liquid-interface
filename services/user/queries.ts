import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchUserDeposits, fetchUserInfo, fetchUserLikes, fetchUserStrategies } from './apis';

const useUser = (walletAddress: string) => {
  return useQuery({
    queryKey: ['user', walletAddress],
    queryFn: () => fetchUserInfo(walletAddress),
    enabled: !!walletAddress,
  });
};

const useUserStrategies = (walletAddress: string) => {
  return useInfiniteQuery({
    queryKey: ['userStrategies', walletAddress],
    queryFn: ({ pageParam }) => fetchUserStrategies(walletAddress, pageParam),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
    initialPageParam: '',
  });
};

const useUserDeposits = (walletAddress: string) => {
  return useInfiniteQuery({
    queryKey: ['userDeposits', walletAddress],
    queryFn: ({ pageParam }) => fetchUserDeposits(walletAddress, pageParam),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
    initialPageParam: '',
  });
};

const useUserLikes = (walletAddress: string) => {
  return useInfiniteQuery({
    queryKey: ['userLikes', walletAddress],
    queryFn: ({ pageParam }) => fetchUserLikes(walletAddress, pageParam),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
    initialPageParam: '',
  });
};

export { useUser, useUserStrategies, useUserDeposits, useUserLikes };
