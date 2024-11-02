export class SmartAccountInfoNotFoundError extends Error {
  constructor() {
    super('Smart account info is not found');
    this.name = 'SmartAccountInfoNotFoundError';
  }
}

export class SmartAccountInfoNotPersistedError extends Error {
  constructor() {
    super('Smart account info is not persisted');
    this.name = 'SmartAccountInfoNotPersistedError';
  }
}
