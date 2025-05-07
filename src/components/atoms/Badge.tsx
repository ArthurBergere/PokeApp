import React from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { BadgeProps } from "../propsModel/Badge.type";

const badgeColors = {
  normal: "bg-gray-400 text-white",
  fire: "bg-red-500 text-white",
  water: "bg-blue-500 text-white",
  electric: "bg-yellow-400 text-black",
  grass: "bg-green-500 text-white",
  ice: "bg-cyan-300 text-black",
  fighting: "bg-red-700 text-white",
  poison: "bg-purple-600 text-white",
  ground: "bg-yellow-700 text-white",
  flying: "bg-sky-300 text-black",
  psychic: "bg-pink-500 text-white",
  bug: "bg-lime-500 text-black",
  rock: "bg-yellow-800 text-white",
  ghost: "bg-indigo-600 text-white",
  dragon: "bg-indigo-700 text-white",
  dark: "bg-gray-800 text-white",
  steel: "bg-gray-500 text-white",
  fairy: "bg-pink-300 text-black",
};


const Badge: React.FC<BadgeProps> = ({ variant, type, className }) => {
  const { t } = useTranslation();
  const renderMultipleTypeBadges = (types: string[], className?: string) => (
    <div className="flex space-x-2">
      {types.map((tType) => {
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
            {t(`types.${tType}`)}
          </span>
        );
      })}
    </div>
  );
  
  // Définir la couleur et le style en fonction du type Pokémon ou de la variante
  let badgeClass = "";

  // créer un badge pour chaque type
  if (variant === "type" && Array.isArray(type)) {
    return renderMultipleTypeBadges(type, className);
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
      {t(`types.${type}`)}
    </span>
  );
};

export default Badge;
