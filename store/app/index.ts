import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  hideSearch: boolean;
  searchIsFocused: boolean;
}

const initialState: AppState = {
  hideSearch: false,
  searchIsFocused: false,
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
  },
});

export const { setHideSearch, setSearchIsFocused } = appReducer.actions;

export default appReducer.reducer;
