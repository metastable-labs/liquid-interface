export interface IActionCard {
  actions: any;
  navigationVariant?: 'primary' | 'secondary';
  variant: 'supply' | 'borrow' | 'deposit' | 'stake';
  selected: boolean | null;
  action?: () => void;
}
