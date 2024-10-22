interface ILQDLoadingStep {
  title: string;
  subtitle: string;
  icon: React.ReactElement;
  isCompleted: boolean;
  isLast?: boolean;
}
