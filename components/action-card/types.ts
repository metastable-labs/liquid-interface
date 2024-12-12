export type IActionIconVariant = 'deposit' | 'stake' | 'borrow' | 'supply' | 'sort';
export interface IActionCard {
  actions: any;
  navigationVariant?: 'primary' | 'secondary';
  variant: IActionIconVariant;
  selected: boolean | null;
  onSelect?: () => void;
}
