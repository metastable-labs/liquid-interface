import { strategyAxiosInstance } from '@/init/axios';

const searchFeed = async (
  query?: string,
  pageParam?: string,
  minTvl?: string,
  maxTvl?: string,
  assets?: string[],
  protocols?: string[]
) => {
  const params = new URLSearchParams();
  if (query) params.append('q', query);
  if (pageParam) params.append('cursor', pageParam);
  if (minTvl) params.append('minTvl', minTvl);
  if (maxTvl) params.append('maxTvl', maxTvl);
  if (assets) assets.forEach((asset) => params.append('assets[]', asset));
  if (protocols) protocols.forEach((protocol) => params.append('protocols[]', protocol));

  return (
    await strategyAxiosInstance.get<Feeds>(`search`, {
      params: params,
    })
  ).data;
};

export { searchFeed };
