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

export type { IPaymentMethodSelection, IMethod };
