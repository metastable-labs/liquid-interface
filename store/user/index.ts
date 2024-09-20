import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: User | null;
  loadingUser: boolean;
}

const initialState: UserState = {
  user: null,
  loadingUser: false,
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoadingUser: (state, action: PayloadAction<boolean>) => {
      state.loadingUser = action.payload;
    },

    setUser: (state, action: PayloadAction<User | null>) => {
      if (action.payload) {
        state.user = { ...action.payload };
      } else {
        state.user = null;
      }
    },
  },
});

export const { setLoadingUser, setUser } = userReducer.actions;

export default userReducer.reducer;
