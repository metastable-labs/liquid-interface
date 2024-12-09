import { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { TextInputProps } from 'react-native';

interface ILQDInput<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: Omit<RegisterOptions<T>, 'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'>;
  label?: string;
  placeholder?: string;
  variant?: 'primary' | 'secondary' | 'search' | 'close';
  inputProps?: TextInputProps;
  iconAction?: () => void;
}

export type { ILQDInput };
