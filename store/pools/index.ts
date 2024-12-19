import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { defaultPoolResponse, Pool, PoolResponse } from './types';
import { Address } from 'viem';

export interface PoolsState {
  pools: PoolResponse;
  trendingPools: PoolResponse;
  hotPools: PoolResponse;
  topGainers: PoolResponse;
  searchedPools: PoolResponse;
  selectedPool: Pool | undefined;
  loadingPools: boolean;
  refreshingPools: boolean;
  searchingPools: boolean;
  recentSearchedPools: Pool[];
}

const initialState: PoolsState = {
  pools: defaultPoolResponse,
  trendingPools: defaultPoolResponse,
  hotPools: defaultPoolResponse,
  topGainers: defaultPoolResponse,
  searchedPools: defaultPoolResponse,
  selectedPool: undefined,
  loadingPools: false,
  refreshingPools: false,
  searchingPools: false,
  recentSearchedPools: [],
};

export const poolReducer = createSlice({
  name: 'pools',
  initialState,
  reducers: {
    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.refreshingPools = action.payload;
    },

    setLoadingPools: (state, action: PayloadAction<boolean>) => {
      state.loadingPools = action.payload;
    },

    setSearchingPools: (state, action: PayloadAction<boolean>) => {
      state.searchingPools = action.payload;
    },

    setpools: (state, action: PayloadAction<PoolResponse | undefined>) => {
      if (action.payload) {
        state.pools = { ...action.payload };
      } else {
        state.pools = defaultPoolResponse;
      }
    },

    setHotPools: (state, action: PayloadAction<PoolResponse | undefined>) => {
      if (action.payload) {
        state.hotPools = { ...action.payload };
      } else {
        state.hotPools = { ...defaultPoolResponse };
      }
    },

    setSelectedPool: (state, action: PayloadAction<Pool | undefined>) => {
      state.selectedPool = action.payload;
    },

    setTopGainers: (state, action: PayloadAction<PoolResponse | undefined>) => {
      if (action.payload) {
        state.topGainers = { ...action.payload };
      } else {
        state.topGainers = { ...defaultPoolResponse };
      }
    },

    setTrendingPools: (state, action: PayloadAction<PoolResponse | undefined>) => {
      if (action.payload) {
        state.trendingPools = { ...action.payload };
      } else {
        state.trendingPools = { ...defaultPoolResponse };
      }
    },

    setSearchedPools: (state, action: PayloadAction<PoolResponse | undefined>) => {
      if (action.payload) {
        state.searchedPools = { ...action.payload };
      } else {
        state.searchedPools = { ...defaultPoolResponse };
      }
    },

    setRecentSearchedPool: (state, action: PayloadAction<Pool>) => {
      const newPool = action.payload;

      if (!state.recentSearchedPools.some((pool) => pool.address === newPool.address)) {
        state.recentSearchedPools = [newPool, ...state.recentSearchedPools];

        if (state.recentSearchedPools.length > 10) {
          state.recentSearchedPools.pop();
        }
      }
    },

    clearRecentSearchedPools: (state) => {
      state.recentSearchedPools = [];
    },
  },
});

export const {
  setLoadingPools,
  setpools,
  setTrendingPools,
  setHotPools,
  setTopGainers,
  setRefreshing,
  setSelectedPool,
  setSearchingPools,
  setSearchedPools,
  setRecentSearchedPool,
  clearRecentSearchedPools,
} = poolReducer.actions;

export default poolReducer.reducer;
