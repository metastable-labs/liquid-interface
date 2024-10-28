import { PublicClient } from 'viem';

// Rate limiting utility
export class RateLimiter {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  private lastCall = 0;
  private minDelay: number;

  constructor(callsPerSecond: number) {
    this.minDelay = 1000 / callsPerSecond;
  }

  async enqueue<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          resolve(await fn());
        } catch (error) {
          reject(error);
        }
      });
      this.process();
    });
  }

  private async process() {
    if (this.processing) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const now = Date.now();
      const timeSinceLastCall = now - this.lastCall;

      if (timeSinceLastCall < this.minDelay) {
        await new Promise((resolve) => setTimeout(resolve, this.minDelay - timeSinceLastCall));
      }

      const fn = this.queue.shift();
      if (fn) {
        this.lastCall = Date.now();
        await fn().catch(console.error);
      }
    }

    this.processing = false;
  }
}

// Retry utility
export const retry = async <T>(fn: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay * 2);
  }
};

// Cache utility
export class Cache<T> {
  private cache = new Map<string, { value: T; timestamp: number }>();
  private duration: number;

  constructor(durationMs: number) {
    this.duration = durationMs;
  }

  get(key: string): T | undefined {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.duration) {
      return cached.value;
    }
    this.cache.delete(key);
    return undefined;
  }

  set(key: string, value: T): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
    });
  }
}

// Contract call wrapper with rate limiting and retries
export const createRateLimitedContract = (publicClient: PublicClient, callsPerSecond: number = 5, cacheDuration: number = 60000) => {
  const rateLimiter = new RateLimiter(callsPerSecond);
  const cache = new Cache<any>(cacheDuration);

  return {
    async call<T>(key: string, fn: () => Promise<T>): Promise<T> {
      const cached = cache.get(key);
      if (cached !== undefined) {
        return cached;
      }

      return rateLimiter.enqueue(async () => {
        try {
          const result = await retry(fn);
          cache.set(key, result);
          return result;
        } catch (error) {
          console.error('Contract call failed:', error);
          throw error;
        }
      });
    },
  };
};
