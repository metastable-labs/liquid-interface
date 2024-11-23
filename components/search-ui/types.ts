import { Pool } from '@/store/pools/types';

type SectionQuery = 'vol' | 'fees' | 'tvl';

export interface ISearchSection {
  title: string;
  children: React.ReactElement;
  onClear?: () => void;
  query?: SectionQuery;
  setQuery?: (query: SectionQuery) => void;
  index: number;
}

export interface IRecentCard {
  pool: Pool;
  navigationVariant?: 'primary' | 'secondary';
}

interface IExploreCard {
  variant: 'primary' | 'secondary' | 'tertiary';
  title: string;
  id: string;
}
