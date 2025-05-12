import React from "react";
import clsx from "clsx";
import { ButtonProps } from "../propsModel/Button.type";
import { motion } from "framer-motion"; 

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  disabled = false,
  onClick,
  children,
  className
}) => {

  const baseStyles = "px-4 py-2 rounded-2xl font-semibold transition-all duration-200 focus:outline-none";


const variantStyles = {
  primary: "bg-blue-500 text-black hover:bg-blue-400 active:bg-blue-600",
  secondary: "bg-yellow-500 text-black hover:bg-yellow-400 active:bg-yellow-600",
  outline: 
    "border border-gray-600 text-gray-200 bg-transparent " +
    "hover:bg-gray-800 hover:border-gray-500 " +
    "active:bg-gray-700 active:border-gray-600 " +
    "focus:ring-2 focus:ring-gray-500 focus:outline-none " +
    "transition-all duration-300 ease-in-out",
};

  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <motion.button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        disabled ? disabledStyles : "cursor-pointer",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }} // Animation légère lors du survol
      whileTap={{ scale: 0.95 }} // Réduction légère lors du clic
      transition={{ type: "spring", stiffness: 200, damping: 15 }} // Fluidité de l'animation
    >
      {children}
    </motion.button>
  );
};

export default Button;
