import { axiosInstance, strategyAxiosInstance } from '@/init/axios';

const fetchUserInfo = async (walletAddress: string) => {
  return (await axiosInstance.get<User>(`/users/${walletAddress}`)).data;
};

const fetchUserStrategies = async (walletAddress: string, pageParam?: string) => {
  return (
    await strategyAxiosInstance.get<UserStrategies>(`user/${walletAddress}`, {
      params: {
        cursor: pageParam,
        limit: 10,
      },
    })
  ).data;
};

const fetchUserDeposits = async (walletAddress: string, pageParam?: string) => {
  return (
    await strategyAxiosInstance.get<UserStrategies>(`user/${walletAddress}/deposits`, {
      params: {
        cursor: pageParam,
        limit: 10,
      },
    })
  ).data;
};

const fetchUserLikes = async (walletAddress: string, pageParam?: string) => {
  return (
    await strategyAxiosInstance.get<UserStrategies>(`user/${walletAddress}/liked`, {
      params: {
        cursor: pageParam,
        limit: 10,
      },
    })
  ).data;
};

export { fetchUserInfo, fetchUserStrategies, fetchUserDeposits, fetchUserLikes };
