import {
  AerodromeIcon,
  BorrowIcon,
  CoinbaseWalletIcon,
  CuratorIcon,
  DebitCardIcon,
  DepositIcon,
  MoonWellIcon,
  MorphoIcon,
  StakeIcon,
  SupplyIcon,
} from '@/assets/icons';

const ICONS = {
  aerodrome: <AerodromeIcon height={24} width={24} />,
  moonwell: <MoonWellIcon height={24} width={24} />,
  morpho: <MorphoIcon height={24} width={24} />,
  stake: <StakeIcon fill="#1E293B" height={24} width={24} />,
  deposit: <DepositIcon fill="#1E293B" height={24} width={24} />,
  borrow: <BorrowIcon fill="#1E293B" height={24} width={24} />,
  supply: <SupplyIcon />,
  sort: <CuratorIcon />,
  debitCard: <DebitCardIcon />,
  crypto: <CuratorIcon />,
  coinBase: <CoinbaseWalletIcon />,
};

export default ICONS;
