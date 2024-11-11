type Method = 'debit' | 'liquid' | 'coinbase';

interface IPaymentMethodSelection {
  method: Method;
  setMethod: (method: 'debit' | 'liquid' | 'coinbase') => void;
}

type Methods = {
  icon: (color?: string) => React.ReactElement;
  method: Method;
  title: string;
};

interface ICoinSelectorInput {
  address?: string;
  selectedToken: (address: string) => void;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

type TokenValue = {
  asset?: TokenItem;
  value: string;
};

type ErrorState = undefined | 'primary' | 'secondary';

interface IErrorMessage {
  title: string;
  description: string | React.ReactElement;
  swap?: {
    from: string;
    for: string;
  };
}

type ErrorsArray = {
  primary: IErrorMessage;
  secondary: IErrorMessage;
};

type Info = {
  icon: 'primary' | 'secondary' | 'tertiary';
  title: string;
  value: string;
};

interface IInfo {
  infos: Array<Info>;
}

interface ILoading {
  primaryTitle: string;
  secondaryTitle: string;
}

type TokenItem = {
  address: `0x${string}`;
  symbol: string;
  decimals: number;
  balance: string;
  isListed: boolean;
  usdPrice: string;
  logoUrl: string;
  lastUpdated: string;
  createdAt: string;
};
