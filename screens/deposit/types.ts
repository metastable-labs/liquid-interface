import { Href } from 'expo-router';

interface IPaymentMethodSelection {
  show: boolean;
  close: () => void;
}

interface IMethod {
  text: string;
  icon: JSX.Element;
  path: Href<string>;
}

interface Wallet {
  id: string;
  title: string;
}

interface WalletCategory {
  title: string;
  children: Wallet[];
}

interface ConncetWalletProps {
  openCloseComment: () => void;
  showCommentSection: boolean;
  data: WalletCategory[];
}

export type { IPaymentMethodSelection, IMethod, ConncetWalletProps };
