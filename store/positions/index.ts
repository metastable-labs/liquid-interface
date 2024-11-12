import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Position } from './types';
import { Address } from 'viem';

export interface PositionsState {
  positions: Position[];
  selectedPosition: Position | undefined;
  loadingPositions: boolean;
  refreshingPositions: boolean;
}

const initialState: PositionsState = {
  positions: [],
  selectedPosition: undefined,
  loadingPositions: false,
  refreshingPositions: false,
};

export const positionReducer = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.refreshingPositions = action.payload;
    },

    setLoadingPositions: (state, action: PayloadAction<boolean>) => {
      state.loadingPositions = action.payload;
    },

    setPositions: (state, action: PayloadAction<Position[] | undefined>) => {
      if (action.payload) {
        state.positions = [...action.payload];
      } else {
        state.positions = [];
      }
    },

    setSelectedPosition: (state, action: PayloadAction<Position | undefined>) => {
      state.selectedPosition = action.payload;
    },
  },
});

export const { setLoadingPositions, setPositions, setRefreshing, setSelectedPosition } = positionReducer.actions;

export default positionReducer.reducer;
