export class SmartAccountInfoNotAvailableError extends Error {
  constructor() {
    super('Smart account info is not available');
    this.name = 'SmartAccountInfoNotAvailableError';
  }
}

export class SmartAccountInfoNotPersistedError extends Error {
  constructor() {
    super('Smart account info is not persisted');
    this.name = 'SmartAccountInfoNotPersistedError';
  }
}

export class RegistrationOptionsNotAvailableError extends Error {
  constructor() {
    super('Registration options are not available');
    this.name = 'RegistrationOptionsNotAvailableError';
  }
}

export class PasskeyNotSupportedError extends Error {
  constructor() {
    super('Passkeys are not supported on this device');
    this.name = 'PasskeyNotSupportedError';
  }
}

export class FailedToCreatePasskeyCredentialError extends Error {
  constructor() {
    super('Failed to create passkey credential');
    this.name = 'FailedToCreatePasskeyCredentialError';
  }
}

export class FailedToUpdateUserAddressError extends Error {
  constructor() {
    super('Failed to update user address');
    this.name = 'FailedToUpdateUserAddressError';
  }
}

export class FailedToGetPasskeyCredentialError extends Error {
  constructor() {
    super('Failed to get passkey credential');
    this.name = 'FailedToGetPasskeyCredentialError';
  }
}

export class CredentialRequestOptionsNotAvailableError extends Error {
  constructor(field: string) {
    super('Credential request options are not available');
    this.name = 'CredentialRequestOptionsNotAvailableError';
    this.cause = field;
  }
}
