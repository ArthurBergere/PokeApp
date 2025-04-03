import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { ButtonProps } from "../propsModel/Button.type";


const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  disabled = false,
  onClick,
  children,
}) => {
  const { t } = useTranslation();

  const baseStyles = "px-4 py-2 rounded-2xl font-semibold transition-all duration-200 focus:outline-none";

  const variantStyles = {
    primary: "bg-blue-500 text-black hover:bg-blue-400 active:bg-blue-600",
    secondary: "bg-yellow-500 text-black hover:bg-yellow-400 active:bg-yellow-600",
    outline:
      "border border-gray-300 text-gray-300 hover:bg-gray-800 active:bg-gray-700",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], disabled && disabledStyles)}
      onClick={onClick}
      disabled={disabled}
    >
      {t(children)}
    </button>
  );
};

export default Button;