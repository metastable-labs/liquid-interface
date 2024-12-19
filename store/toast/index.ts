import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Toast } from './types';

const initialState: Toast = {
  title: '',
  description: '',
  variant: 'success',
  isVisible: false,
};

export const toastReducer = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<Toast>) => {
      const { title, description, variant } = action.payload;
      state.title = title;
      state.description = description;
      state.variant = variant;
      state.isVisible = true;
    },

    hideToast: (state) => {
      state.isVisible = false;
      state.title = '';
      state.description = '';
    },
  },
});

export const { showToast, hideToast } = toastReducer.actions;

export default toastReducer.reducer;
