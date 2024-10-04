interface ILQDBottomSheet {
  title: string;
  variant?: 'primary' | 'secondary';
  show: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}
