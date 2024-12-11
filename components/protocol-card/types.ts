export type IProtocolIconVariant = 'moonwell' | 'aerodrome' | 'morpho';

export interface IProtocolCard {
  protocol: any;
  navigationVariant?: 'primary' | 'secondary';
  variant: IProtocolIconVariant;
  selected: boolean | null;
  action?: () => void;
}
