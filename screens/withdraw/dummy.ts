import { IAsset } from './types';

const defaultAsset: IAsset = {
  id: 'USDC_4_506',
  balance: 4_506,
  iconUrl:
    'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119033/is3tphz7tf06jpj5g7x3.png',
  name: 'USD Coin',
  symbol: 'USDC',
};

const assets: Array<IAsset> = [
  {
    id: 'USDC_4_506',
    balance: 4_506,
    iconUrl:
      'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119033/is3tphz7tf06jpj5g7x3.png',
    name: 'USD Coin',
    symbol: 'USDC',
  },

  {
    id: 'ETH_300',
    balance: 300,
    iconUrl:
      'https://res.cloudinary.com/dxnd4k222/image/upload/v1727119032/uwficdtvggd49apjfpt4.png',
    name: 'Ethereum',
    symbol: 'ETH',
  },

  {
    id: 'BTC_700',
    balance: 700,
    iconUrl:
      'https://res.cloudinary.com/dxnd4k222/image/upload/v1728237253/qxapalnjebncnqbogs7n.png',
    name: 'cbBTC',
    symbol: 'cbBTC',
  },

  {
    id: 'AERO_14_567',
    balance: 14_567,
    iconUrl:
      'https://res.cloudinary.com/dxnd4k222/image/upload/v1728237253/imbzsp28edm5x5lldcxc.png',
    name: 'AERO',
    symbol: 'AERO',
  },
];

export { defaultAsset, assets };
