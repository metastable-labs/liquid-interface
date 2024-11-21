interface ISection {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  icon: React.ReactElement;
  action?: () => void;
  isShowingAll?: boolean;
  loading?: boolean;
}
