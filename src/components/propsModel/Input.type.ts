import { InputHTMLAttributes } from "react";

type InputVariant = "text" | "password" | "search";
type IconPosition = "left" | "right";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  label?: string;
  tPlaceholder?: string; 
}