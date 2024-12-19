interface DiscoverFiltersProps {
  setMinTvl: (value: string) => void;
  setMaxTvl: (value: string) => void;
  setAssets: (assets: any[]) => void;
  setProtocols: (protocols: string[]) => void;
  setSearchQuery: (query: string) => void;
  setCursor: (cursor: string) => void;
}
