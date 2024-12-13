import { axiosInstance } from '@/init/axios';

const fetchUserInfo = async (walletAddress: string) => {
  return (await axiosInstance.get<User>(`/users/${walletAddress}`)).data;
};

const fetchUserStrategies = async (walletAddress: string, pageParam?: string) => {
  return (
    await axiosInstance.get<UserStrategies>(`/users/${walletAddress}/strategies`, {
      params: {
        cursor: pageParam,
        limit: 10,
      },
    })
  ).data;
};

const fetchUserDeposits = async (walletAddress: string, pageParam?: string) => {
  return (
    await axiosInstance.get<UserDeposits>(`/users/${walletAddress}/deposits`, {
      params: {
        cursor: pageParam,
        limit: 10,
      },
    })
  ).data;
};

const fetchUserLikes = async (walletAddress: string, pageParam?: string) => {
  return (
    await axiosInstance.get<UserLikes>(`/users/${walletAddress}/likes`, {
      params: {
        cursor: pageParam,
        limit: 10,
      },
    })
  ).data;
};

export { fetchUserInfo, fetchUserStrategies, fetchUserDeposits, fetchUserLikes };
