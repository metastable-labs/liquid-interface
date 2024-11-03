import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { defaultPoolResponse, Pool, PoolResponse } from './types';
import { Address } from 'viem';

export interface PoolsState {
  pools: PoolResponse;
  trendingPools: PoolResponse;
  hotPools: PoolResponse;
  topGainers: PoolResponse;
  selectedPool: Pool | undefined;
  loadingPools: boolean;
  refreshingPools: boolean;
}

const initialState: PoolsState = {
  pools: defaultPoolResponse,
  trendingPools: defaultPoolResponse,
  hotPools: defaultPoolResponse,
  topGainers: defaultPoolResponse,
  selectedPool: undefined,
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

    setHotPools: (state, action: PayloadAction<PoolResponse | undefined>) => {
      if (action.payload) {
        state.hotPools = { ...action.payload };
      } else {
        state.hotPools = defaultPoolResponse;
      }
    },

    setSelectedPool: (state, action: PayloadAction<Pool | undefined>) => {
      state.selectedPool = action.payload;
    },

    setTopGainers: (state, action: PayloadAction<PoolResponse | undefined>) => {
      if (action.payload) {
        state.topGainers = { ...action.payload };
      } else {
        state.topGainers = defaultPoolResponse;
      }
    },

    setTrendingPools: (state, action: PayloadAction<PoolResponse | undefined>) => {
      if (action.payload) {
        state.trendingPools = { ...action.payload };
      } else {
        state.trendingPools = defaultPoolResponse;
      }
    },
  },
});

export const { setLoadingPools, setpools, setTrendingPools, setHotPools, setTopGainers, setRefreshing, setSelectedPool } =
  poolReducer.actions;

export default poolReducer.reducer;
