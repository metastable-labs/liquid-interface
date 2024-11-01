import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  hideSearch: boolean;
  searchIsFocused: boolean;
  coinbaseIsActive: boolean;
}

const initialState: AppState = {
  hideSearch: false,
  searchIsFocused: false,
  coinbaseIsActive: false,
};

export const appReducer = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setHideSearch: (state, action: PayloadAction<boolean>) => {
      state.hideSearch = action.payload;
    },

    setSearchIsFocused: (state, action: PayloadAction<boolean>) => {
      state.searchIsFocused = action.payload;
    },

    setCoinbaseIsActive: (state, action: PayloadAction<boolean>) => {
      state.coinbaseIsActive = action.payload;
    },
  },
});

export const { setHideSearch, setSearchIsFocused, setCoinbaseIsActive } = appReducer.actions;

export default appReducer.reducer;
