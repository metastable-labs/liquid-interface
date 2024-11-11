import { Pool } from '@/store/pools/types';

export interface PoolPairPaper {
  pool: Pool;
  navigationVariant?: 'primary' | 'secondary';
  isHot?: boolean;
}
