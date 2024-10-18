import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { Address } from 'viem';
import { ToCoinbaseSmartAccountReturnType } from 'viem/_types/account-abstraction';

export interface SmartAccountState {
  readonly smartAccount: ToCoinbaseSmartAccountReturnType | null;
  readonly address: Address | null;
}

const initialState: SmartAccountState = {
  smartAccount: null,
  address: null,
};

export const smartAccountReducer = createSlice({
  name: 'smartAccount',
  initialState,
  reducers: {
    setSmartAccount: (
      state,
      action: PayloadAction<ToCoinbaseSmartAccountReturnType | null>
    ) => {
      if (action.payload) {
        // @ts-expect-error Types of property 'abi' are incompatible. 'readonly' cannot be assigned to the mutable type
        state.smartAccount = { ...action.payload };
      } else {
        state.smartAccount = null;
      }
    },

    setAddress: (state, action: PayloadAction<Address | null>) => {
      if (action.payload) {
        state.address = action.payload;
      } else {
        state.address = null;
      }
    },
  },
});

export const { setSmartAccount, setAddress } = smartAccountReducer.actions;

export default smartAccountReducer.reducer;
