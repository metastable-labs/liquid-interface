import { TokenItem } from '@/store/account/types';

export interface AssetSelection {
  title: string;
  show: boolean;
  close: () => void;
  setAsset: (asset: TokenItem) => void;
  selectedAsset?: TokenItem;
}
