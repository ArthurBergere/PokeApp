export type ButtonVariant = "primary" | "secondary" | "outline";

export interface ButtonProps {
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  children: string;
  className?: string;
}
