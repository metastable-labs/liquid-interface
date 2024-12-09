import { Pool } from '@/store/pools/types';

export interface PoolPairPaper {
  pool: Pool;
  navigationVariant?: 'primary' | 'secondary';
  showFullSymbol?: boolean;
  selected?: boolean | null;
}
