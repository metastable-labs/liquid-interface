interface IAssetItem {
  title: string;
  subTitle: string;
  icon: string;
}

interface AddMoneyActionItem {
  title: string;
  id: string;
  comingSoon: boolean;
  icon: 'debitCard' | 'crypto' | 'coinBase' | 'supply';
}
