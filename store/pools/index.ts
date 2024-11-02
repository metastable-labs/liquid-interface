import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { defaultPoolResponse, PoolResponse } from './types';

export interface PoolsState {
  pools: PoolResponse;
  trendingPools: PoolResponse;
  hotPools: PoolResponse;
  topGainers: PoolResponse;
  loadingPools: boolean;
  refreshingPools: boolean;
}

const initialState: PoolsState = {
  pools: defaultPoolResponse,
  trendingPools: defaultPoolResponse,
  hotPools: defaultPoolResponse,
  topGainers: defaultPoolResponse,
  loadingPools: false,
  refreshingPools: false,
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

    setpools: (state, action: PayloadAction<PoolResponse | undefined>) => {
      if (action.payload) {
        state.pools = { ...action.payload };
      } else {
        state.pools = defaultPoolResponse;
      }
    },

    setTrendingPools: (state, action: PayloadAction<PoolResponse | undefined>) => {
      if (action.payload) {
        state.trendingPools = { ...action.payload };
      } else {
        state.trendingPools = defaultPoolResponse;
      }
    },

    setHotPools: (state, action: PayloadAction<PoolResponse | undefined>) => {
      if (action.payload) {
        state.hotPools = { ...action.payload };
      } else {
        state.hotPools = defaultPoolResponse;
      }
    },

    setTopGainers: (state, action: PayloadAction<PoolResponse | undefined>) => {
      if (action.payload) {
        state.topGainers = { ...action.payload };
      } else {
        state.topGainers = defaultPoolResponse;
      }
    },
  },
});

export const { setLoadingPools, setpools, setTrendingPools, setHotPools, setTopGainers, setRefreshing } = poolReducer.actions;

export default poolReducer.reducer;
