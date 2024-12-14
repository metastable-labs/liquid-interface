interface IAssetItem {
  title: string;
  subTitle: string;
  icon: string;
}

interface AddMoneyActionItem {
  title: string;
  id: string;
  icon: 'debitCard' | 'crypto' | 'coinBase' | 'supply';
}
