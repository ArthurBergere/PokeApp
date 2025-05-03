import React, { JSX } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { TextColor, TextProps } from "../propsModel/Text.type";


const colorMap: Record<TextColor, string> = {
  primary: "text-blue-400",
  secondary: "text-gray-400",
  danger: "text-red-500",
  white: "text-white",
  gray: "text-gray-300",
};

const sizeMap = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "6xl": "text-6xl"
};

const Text: React.FC<TextProps> = ({
  variant = "p",
  tKey,
  children,
  size = "base",
  color = "white",
  bold = false,
  italic = false,
  className,
}) => {
  const { t } = useTranslation();
  const content = tKey ? t(tKey) : children;
  const textClasses = clsx(
    sizeMap[size],
    colorMap[color],
    {
      "font-bold": bold,
      italic: italic,
    },
    className
  );

  const Tag = variant as keyof JSX.IntrinsicElements;

  return <Tag className={textClasses}>{content}</Tag>;
};

export default Text;
