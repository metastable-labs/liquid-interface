import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  showSearch: boolean;
  searchIsFocused: boolean;
}

const initialState: AppState = {
  showSearch: false,
  searchIsFocused: false,
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
  },
});

export const { setShowSearch, setSearchIsFocused } = appReducer.actions;

export default appReducer.reducer;
