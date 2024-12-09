export interface IProtocolCard {
  protocol: any;
  navigationVariant?: 'primary' | 'secondary';
  selected: boolean | null;
  action?: () => void;
}
