import { Pool } from '@/store/pools/types';

export interface PoolPairCard {
  pool: Pool;
  loading: boolean;
  navigationVariant?: 'primary' | 'secondary';
}
