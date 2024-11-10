type SectionQuery = 'vol' | 'fees' | 'tvl';

interface ISearchSection {
  title: string;
  children: React.ReactElement;
  onClear?: () => void;
  query?: SectionQuery;
  setQuery?: (query: SectionQuery) => void;
  index: number;
}

interface IRecentCard {
  id: string;
  primaryIconURL: string;
  secondaryIconURL: string;
  primaryTitle: string;
  secondaryTitle: string;
}

interface IExploreCard {
  variant: 'primary' | 'secondary' | 'tertiary';
  title: string;
  id: string;
}
