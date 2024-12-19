import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  showSearch: boolean;
  searchIsFocused: boolean;
  strategyActions: StrategyAction[];
}

const initialState: AppState = {
  showSearch: false,
  searchIsFocused: false,
  strategyActions: [],
};

export const appReducer = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setShowSearch: (state, action: PayloadAction<boolean>) => {
      state.showSearch = action.payload;
    },

    setSearchIsFocused: (state, action: PayloadAction<boolean>) => {
      state.searchIsFocused = action.payload;
    },

    setStrategyActions: (state, action: PayloadAction<StrategyAction[]>) => {
      state.strategyActions = [...action.payload];
    },
  },
});

export const { setShowSearch, setSearchIsFocused, setStrategyActions } = appReducer.actions;

export default appReducer.reducer;
