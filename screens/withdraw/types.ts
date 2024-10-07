import { Href } from 'expo-router';

interface IAssetSelection {
  show: boolean;
  close: () => void;
  setAsset: (asset: IAsset) => void;
  asset?: IAsset;
}

interface IMethod {
  text: string;
  icon: JSX.Element;
  path: Href<string>;
}

interface IAsset {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  iconUrl: string;
}

export type { IAssetSelection, IMethod, IAsset };
