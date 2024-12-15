import { axiosInstance } from '@/init/axios';

const strategyBaseUrl = '/strategy/strategies';

const fetchUserInfo = async (walletAddress: string) => {
  return (await axiosInstance.get<User>(`/users/${walletAddress}`)).data;
};

const fetchUserStrategies = async (walletAddress: string, pageParam?: string) => {
  return (
    await axiosInstance.get<UserStrategies>(`${strategyBaseUrl}/user/${walletAddress}`, {
      params: {
        cursor: pageParam,
        limit: 10,
      },
    })
  ).data;
};

const fetchUserDeposits = async (walletAddress: string, pageParam?: string) => {
  return (
    await axiosInstance.get<UserStrategies>(`${strategyBaseUrl}/user/${walletAddress}/deposits`, {
      params: {
        cursor: pageParam,
        limit: 10,
      },
    })
  ).data;
};

const fetchUserLikes = async (walletAddress: string, pageParam?: string) => {
  return (
    await axiosInstance.get<UserStrategies>(`${strategyBaseUrl}/user/${walletAddress}/liked`, {
      params: {
        cursor: pageParam,
        limit: 10,
      },
    })
  ).data;
};

export { fetchUserInfo, fetchUserStrategies, fetchUserDeposits, fetchUserLikes };
