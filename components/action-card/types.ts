export type IActionIconVariant = 'deposit' | 'stake' | 'borrow' | 'supply' | 'sort' | 'debitCard' | 'crypto' | 'coinBase';
export interface IActionCard {
  actions: any;
  navigationVariant?: 'primary' | 'secondary';
  variant: IActionIconVariant;
  selected: boolean | null;
  action?: () => void;
}
