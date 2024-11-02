export class SmartAccountInfoNotFoundError extends Error {
  constructor() {
    super('Smart account info is not persisted, thus unavailable');
    this.name = 'SmartAccountInfoNotFoundError';
  }
}
