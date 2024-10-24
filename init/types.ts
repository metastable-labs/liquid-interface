import { Address as EthereumAddress } from 'viem';
import { PublicKeyCredentialCreationOptionsJSON } from 'react-native-passkeys/build/ReactNativePasskeys.types';

export type Address = EthereumAddress;

export type CreatePassKeyCredentialOptions = PublicKeyCredentialCreationOptionsJSON;

export type PasskeyRegistrationResult = {
  credentialId: string;
  attestationObject: string;
  clientDataJSON: string;
};
