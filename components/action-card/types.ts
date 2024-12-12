export type ActionIconVariant = 'deposit' | 'stake' | 'borrow' | 'supply' | 'sort' | 'debitCard' | 'crypto' | 'coinBase';
export interface IActionCard {
  actions: any;
  navigationVariant?: 'primary' | 'secondary';
  variant: ActionIconVariant;
  selected: boolean | null;
  action?: () => void;
}
