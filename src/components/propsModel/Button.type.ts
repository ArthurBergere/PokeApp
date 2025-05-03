import { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline";

export interface ButtonProps {
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}
