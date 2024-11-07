import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { Address } from '@/init/types';
import { PublicKeyCredentialCreationOptionsJSON } from 'react-native-passkeys/build/ReactNativePasskeys.types';

export interface SmartAccountState {
  readonly registrationOptions: PublicKeyCredentialCreationOptionsJSON | null;
  readonly address: Address | null;
}

const initialState: SmartAccountState = {
  registrationOptions: null,
  address: null,
};

export const smartAccountReducer = createSlice({
  name: 'smartAccount',
  initialState,
  reducers: {
    setRegistrationOptions: (state, action: PayloadAction<PublicKeyCredentialCreationOptionsJSON | null>) => {
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

export const { setRegistrationOptions, setAddress } = smartAccountReducer.actions;

export default smartAccountReducer.reducer;
