import React, { useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "lucide-react";
import { InputProps } from "../propsModel/Input.type";



const Input: React.FC<InputProps> = ({
  variant = "text",
  error,
  icon,
  iconPosition = "left",
  disabled,
  tPlaceholder,
  className,
  ...rest
}) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = variant === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : variant;

  const inputClasses = clsx(
    "w-full rounded-xl px-4 py-2 pr-10 border text-sm outline-none transition-all",
    {
      "bg-gray-900 text-white border-gray-700 focus:border-blue-400": !error && !disabled,
      "border-red-500 focus:border-red-500": error,
      "opacity-50 cursor-not-allowed": disabled,
      "pl-10": icon && iconPosition === "left",
      "pr-10": icon && iconPosition === "right",
    },
    className
  );

  return (
    <div className="w-full space-y-1">
      <div className="relative w-full">
        {icon && iconPosition === "left" && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}

        <input
          type={inputType}
          placeholder={tPlaceholder ? t(tPlaceholder) : ""}
          disabled={disabled}
          className={inputClasses}
          {...rest}
        />

        {/* Password toggle (eye icon) */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {/* Custom icon à droite */}
        {!isPassword && icon && iconPosition === "right" && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
      </div>

      {/* Message d'erreur */}
      {error && (
        <p className="text-sm text-red-500 pl-1">
          {t(error)}
        </p>
      )}
    </div>
  );
};

export default Input;
