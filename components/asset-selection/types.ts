interface IAssetSelection {
  title: string;
  show: boolean;
  close: () => void;
  setAsset: (asset: IAsset) => void;
  asset?: IAsset;
  assets: Array<IAsset>;
}

interface IAsset {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  iconUrl: string;
}
