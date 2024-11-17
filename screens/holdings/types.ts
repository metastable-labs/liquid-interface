interface IEmpty {
  icon: 'wallet' | 'radio' | 'coins' | 'dollar';
  title: string;
  subtitle: string;
  action?: {
    title: string;
    onPress: () => void;
  };
  actionIcon?: 'plus' | 'right-caret';
  isLast?: boolean;
}

type Variants = 'primary' | 'secondary';

interface IItem {
  variant: Variants;
  title: string;
  subtitle: string;
  details: Array<{
    title: string;
    value: string;
  }>;
  isEmpty?: boolean;
  empty?: IEmpty;
}

interface CardConfig {
  primaryColor: string;
  secondaryColor: string;
  label: string;
  action: () => void;
}

interface IEmptyData extends Record<Variants, IEmpty> {}

interface ICardConfig extends Record<Variants, CardConfig> {}

type RewardVariants = 'aero' | 'fees';
