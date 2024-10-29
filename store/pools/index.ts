import { createSlice } from '@reduxjs/toolkit';
import { BasePool } from '@/hooks/types';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PoolsState {
  pools: BasePool[];
  trendingPools: BasePool[];
  hotPools: BasePool[];
  topGainers: BasePool[];
  loadingPools: Boolean;
}

const initialState: PoolsState = {
  pools: [],
  trendingPools: [],
  hotPools: [],
  topGainers: [],
  loadingPools: false,
};

export const poolReducer = createSlice({
  name: 'pools',
  initialState,
  reducers: {
    setLoadingPools: (state, action: PayloadAction<Boolean>) => {
      state.loadingPools = action.payload;
    },

    setpools: (state, action: PayloadAction<BasePool[] | undefined>) => {
      if (action.payload) {
        state.pools = [...action.payload];
      } else {
        state.pools = [];
      }
    },

    setTrendingPools: (state, action: PayloadAction<BasePool[] | undefined>) => {
      if (action.payload) {
        state.trendingPools = [...action.payload];
      } else {
        state.trendingPools = [];
      }
    },

    setHotPools: (state, action: PayloadAction<BasePool[] | undefined>) => {
      if (action.payload) {
        state.hotPools = [...action.payload];
      } else {
        state.hotPools = [];
      }
    },

    setTopGainers: (state, action: PayloadAction<BasePool[] | undefined>) => {
      if (action.payload) {
        state.topGainers = [...action.payload];
      } else {
        state.topGainers = [];
      }
    },
  },
});

export const { setLoadingPools, setpools, setTrendingPools, setHotPools, setTopGainers } = poolReducer.actions;

export default poolReducer.reducer;
