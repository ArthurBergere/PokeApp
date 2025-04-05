import React from "react";
import Image from "../atoms/Image";
import Text from "../atoms/Text";
import clsx from "clsx";

type PokemonCardProps = {
  name: string;
  image: string;
  types: string[]; // Un ou deux types
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  onViewDetails?: () => void;
};

const typeStyleMap: Record<string, string> = {
  fire: "bg-red-500",
  water: "bg-blue-400",
  grass: "bg-green-400",
  electric: "bg-yellow-400 text-black",
  psychic: "bg-pink-400",
  normal: "bg-gray-400",
  ghost: "bg-purple-500",
  dragon: "bg-indigo-500",
  fairy: "bg-pink-300",
  bug: "bg-lime-400",
  fighting: "bg-orange-500",
  // fallback
  default: "bg-gray-400",
};

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  image,
  types,
  stats,
}) => {
  
  return (
    <div className="bg-black rounded-lg p-4 max-w-xs">
      {/* Image */}
      <div className="flex justify-center mb-4">
        <Image src={image} alt={name} size="medium" />
      </div>
      
      {/* Name */}
      <Text variant="h2" className="text-center text-cyan-400 text-2xl font-bold mb-2">
        {name}
      </Text>
      
      {/* Type - centered */}
      <div className="flex justify-center mb-3">
        {types.map((type) => (
          <div 
            key={type} 
            className={clsx(
              "px-4 py-1 rounded-full font-semibold",
              typeStyleMap[type.toLowerCase()]
            )}
          >
            {type}
          </div>
        ))}
      </div>
      
      {/* Divider */}
      <div className="border-t border-gray-700 my-2"></div>
      
      {/* Stats */}
      <div className="text-white">
        <div className="flex justify-between mb-1">
          <span>Hp</span>
          <span className="text-cyan-400">{stats.hp}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Attack</span>
          <span className="text-cyan-400">{stats.attack}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Defense</span>
          <span className="text-cyan-400">{stats.defense}</span>
        </div>
        <div className="flex justify-between">
          <span>Speed</span>
          <span className="text-cyan-400">{stats.speed}</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;