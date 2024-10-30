import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { Address } from 'viem';
import { ToCoinbaseSmartAccountReturnType } from 'viem/account-abstraction';
import { CreatePassKeyCredentialOptions } from '@/init/types';

export interface SmartAccountState {
  readonly registrationOptions: CreatePassKeyCredentialOptions | null;
  readonly smartAccount: ToCoinbaseSmartAccountReturnType | null;
  readonly address: Address | null;
}

const initialState: SmartAccountState = {
  registrationOptions: null,
  smartAccount: null,
  address: null,
};

export const smartAccountReducer = createSlice({
  name: 'smartAccount',
  initialState,
  reducers: {
    setSmartAccount: (state, action: PayloadAction<ToCoinbaseSmartAccountReturnType | null>) => {
      if (action.payload) {
        // @ts-expect-error Types of property 'abi' are incompatible. 'readonly' cannot be assigned to the mutable type
        state.smartAccount = { ...action.payload };
      } else {
        state.smartAccount = null;
      }
    },

    setRegistrationOptions: (state, action: PayloadAction<CreatePassKeyCredentialOptions | null>) => {
      if (action.payload) {
        // attestation and extensions are not supported by react-native-passkeys
        const { attestation, extensions, ...registrationOptions } = action.payload;
        state.registrationOptions = { ...registrationOptions };
      } else {
        state.registrationOptions = null;
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

export const { setSmartAccount, setRegistrationOptions, setAddress } = smartAccountReducer.actions;

export default smartAccountReducer.reducer;
