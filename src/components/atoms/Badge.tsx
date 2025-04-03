import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { BadgeProps } from "../propsModel/Badge.type";

const badgeColors = {
  fire: "bg-red-500 text-white",
  water: "bg-blue-500 text-white",
  grass: "bg-green-500 text-white",
  electric: "bg-yellow-500 text-black",
  psychic: "bg-purple-500 text-white",
  bug: "bg-green-300 text-black",
  normal: "bg-gray-500 text-white",
  ghost: "bg-indigo-500 text-white",
  dragon: "bg-teal-500 text-white",
  fairy: "bg-pink-500 text-white",
  fighting: "bg-red-700 text-white",
};


const Badge: React.FC<BadgeProps> = ({ variant, value, type, className }) => {
  const { t } = useTranslation();

  // Définir la couleur et le style en fonction du type Pokémon ou de la variante
  let badgeClass = "";

  // créer un badge pour chaque type
  if (variant === "type" && Array.isArray(type)) {
    return (
      <div className="flex space-x-2">
        {type.map((tType) => {
          const badgeColor = badgeColors[tType as keyof typeof badgeColors] || "bg-gray-400 text-white";
         
          return (
            <span
              key={tType}
              className={clsx(
                "inline-block px-4 py-2 rounded-full font-semibold text-sm",
                badgeColor,
                className
              )}
            >
              {t(tType)}
            </span>
          );
        })}
      </div>
    );
  }

  //gestion si badge level ou status
  switch (variant) {
    case "type":
        if (type && badgeColors[type as keyof typeof badgeColors]) {
            badgeClass = badgeColors[type as keyof typeof badgeColors];
      } else {
        badgeClass = "bg-gray-400 text-white";  // Défaut 
      }
      break;
    case "level":
      badgeClass = "bg-blue-500 text-white";
      break;
    case "status":
      badgeClass = "bg-yellow-500 text-black";
      break;
    default:
      badgeClass = "bg-gray-400 text-white";
  }

  return (
    <span
      className={clsx(
        "inline-block px-4 py-2 rounded-full font-semibold text-sm",
        badgeClass,
        className
      )}
    >
      {t(value.toString())} {/* Support de la traduction */}
    </span>
  );
};

export default Badge;
