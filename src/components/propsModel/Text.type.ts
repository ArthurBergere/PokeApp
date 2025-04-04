export type TextVariant = "h1" | "h2" | "h3" | "p" | "span";
export type TextColor = "primary" | "secondary" | "danger" | "white" | "gray";

export interface TextProps {
  variant?: TextVariant;
  tKey?: string; // clé i18n
  children?: React.ReactNode;
  size?: "sm" | "base" | "lg" | "xl" | "2xl";
  color?: TextColor;
  bold?: boolean;
  italic?: boolean;
  className?: string;
}
