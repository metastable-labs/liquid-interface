export type Toast = {
  title: string;
  description: string;
  variant: 'success' | 'error';
  isVisible?: boolean;
};
