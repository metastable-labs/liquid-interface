/**
 * Order of things
 *
 * 1. Get registration options via API GET call to /registration/options?user=username
 *      returns PublicKeyCredentialCreationOptionsJSON
 *                https://w3c.github.io/webauthn/#dictdef-publickeycredentialcreationoptionsjson
 *
 * 2. Use registration options to create passkey credential
 *      returns PasskeyRegistrationResult =
 *                | WebPassKeyRegistrationResult
 *                | NativePasskeyRegistrationResult;
 *      where NativePasskeyRegistrationResult = {
 *              credentialId: string;
 *              attestationObject: string;
 *              clientDataJSON: string;
 *            };
 *
 * @param username
 */
export function createSmartAccount(username: string) {
  try {
    // const options = await this.api.getRegistrationOptions(username);
    const mockedOptions = {
      // rp: PublicKeyCredentialRpEntity;
      // user: PublicKeyCredentialUserEntityJSON;
      // challenge: Base64URLString;
      // pubKeyCredParams: PublicKeyCredentialParameters[];
      // timeout?: number;
      // excludeCredentials?: PublicKeyCredentialDescriptorJSON[];
      // authenticatorSelection?: AuthenticatorSelectionCriteria;
      // attestation?: AttestationConveyancePreference;
      // extensions?: AuthenticationExtensionsClientInputs;
    };

    // const registrationResponse = await this.passKeyImpl.createPassKeyCredential(options);
    const mockedRegistrationResponse = {
      // credentialId: string;
      // attestationObject: string;
      // clientDataJSON: string;
    };
  } catch (error) {
    // TODO: error handling
  }
}
