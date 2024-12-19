type IconVariant = 'moonwell' | 'aerodrome' | 'morpho' | 'deposit' | 'stake' | 'borrow' | 'supply';

interface IActionItem {
  label?: string;
  title: string;
  icon?: IconVariant;
  logoUrl?: string;
  action?: () => void;
}
interface IActions {
  addNewAction: () => void;
  list: StrategyAction[];
  setList: (data: StrategyAction[]) => void;
}
interface IActionsListItem {
  id: string;
  title: string;
  variant: 'deposit' | 'stake' | 'borrow' | 'supply';
}
interface IActionsRenderItem {
  drag?: () => void;
  item: StrategyAction;
  isActive: boolean;
}

interface ProtocolItem {
  id: string;
  icon: 'moonwell' | 'aerodrome' | 'morpho';
  title: string;
  address: `0x${string}`;
}
