import { Pool } from '@/store/pools/types';

export interface PoolPairCard {
  pool: Pool;
  navigationVariant?: 'primary' | 'secondary';
}
