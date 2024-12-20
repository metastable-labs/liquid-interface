export type ActionIconVariant = 'deposit' | 'stake' | 'borrow' | 'supply' | 'sort' | 'debitCard' | 'crypto' | 'coinBase' | 'disconnect';
export interface IActionCard {
  actions: any;
  navigationVariant?: 'primary' | 'secondary';
  variant: ActionIconVariant;
  comingSoon?: boolean;
  selected?: boolean | null;
  onSelect?: () => void;
}
