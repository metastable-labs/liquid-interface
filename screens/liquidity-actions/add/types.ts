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
  tokenId?: string;
  setTokenId: (tokenId: string) => void;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

type TokenValue = {
  asset?: IAsset;
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
