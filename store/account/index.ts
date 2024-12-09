import { Position } from '@/hooks/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TokenResponse } from './types';

export interface AccountState {
  tokens: TokenResponse;
  positions: Position[];
  lpBalance: number;
  tokenBalance: number;
  loading: boolean;
  refreshing: boolean;
}

const initialState: AccountState = {
  tokens: {
    data: [],
    pagination: {
      hasMore: true,
      page: 0,
      limit: 0,
    },
  },
  positions: [],
  lpBalance: 0,
  tokenBalance: 0,
  loading: false,
  refreshing: false,
};

export const accountReducer = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.refreshing = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setPositions: (state, action: PayloadAction<Position[] | undefined>) => {
      if (action.payload) {
        state.positions = [...action.payload];
      } else {
        state.positions = [];
      }
    },

    setTokens: (state, action: PayloadAction<TokenResponse | undefined>) => {
      if (action.payload) {
        state.tokens = { ...action.payload };
      } else {
        state.tokens = {
          data: [],
          pagination: {
            hasMore: true,
            page: 0,
            limit: 0,
          },
        };
      }
    },

    setTokenBalance: (state, action: PayloadAction<number>) => {
      state.tokenBalance = action.payload;
    },

    setLpBalance: (state, action: PayloadAction<number>) => {
      state.lpBalance = action.payload;
    },
  },
});

export const { setRefreshing, setLoading, setTokens, setTokenBalance, setPositions, setLpBalance } = accountReducer.actions;

export default accountReducer.reducer;
