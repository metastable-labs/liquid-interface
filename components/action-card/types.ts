export type IActionIconVariant = 'deposit' | 'stake' | 'borrow' | 'supply';
export interface IActionCard {
  actions: any;
  navigationVariant?: 'primary' | 'secondary';
  variant: IActionIconVariant;
  selected: boolean | null;
  action?: () => void;
}
