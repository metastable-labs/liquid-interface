interface IActionItem {
  label?: string;
  title: string;
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
