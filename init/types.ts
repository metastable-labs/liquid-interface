import { Address as EthereumAddress } from 'viem';
import { ToCoinbaseSmartAccountReturnType } from 'viem/account-abstraction';
import { PublicKeyCredentialCreationOptionsJSON } from 'react-native-passkeys/build/ReactNativePasskeys.types';

export type Address = EthereumAddress;

export type CreatePassKeyCredentialOptions = {
  data: PublicKeyCredentialCreationOptionsJSON;
  success: boolean;
};

export type PasskeyRegistrationResult = {
  credentialId: string;
  attestationObject: string;
  clientDataJSON: string;
};

export enum PoolType {
  v2 = 'v2',
  hot = 'hot',
  trending = 'trending',
  gainers = 'gainers',
  search = 'search',
}

export type SmartAccount = ToCoinbaseSmartAccountReturnType;

/**
 * Info about the smart account that is persisted to secure store, used to re-initialize the smart account
 */
export type SmartAccountPersistedInfo = {
  publicKey: string;
  registrationResponse: PasskeyRegistrationResult;
};

export type VerifyRegistration = {
  username: string;
  registrationResponse: {
    id: string;
    rawId: string;
    type: string;
    authenticationAttachment: string;
    response: {
      attestationObject: any;
      clientDataJSON: any;
    };
  };
};
