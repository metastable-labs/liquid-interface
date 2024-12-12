type IconVariant = 'moonwell' | 'aerodrome' | 'morpho' | 'deposit' | 'stake' | 'borrow' | 'supply';

interface IActionItem {
  label?: string;
  title?: string;
  icon?: IconVariant;
  action?: () => void;
}
interface IActions {
  action?: () => void;
}
interface IActionsListItem {
  id: string;
  title: string;
  icon: 'deposit' | 'stake' | 'borrow' | 'supply';
}
interface IActionsRenderItem {
  drag?: () => void;
  item: IActionsListItem;
  isActive: boolean;
}
