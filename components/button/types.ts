import { StyleProp, ViewStyle } from "react-native";

interface ILQDButton {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "tertiaryOutline";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export type { ILQDButton };
