import React from "react";
import Image from "../atoms/Image";
import Text from "../atoms/Text";
import Badge from "../atoms/Badge";
import StatLine from "../atoms/StatLine";

type PokemonCardProps = {
  name: string;
  image: string;
  types: string[]; 
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  onViewDetails?: () => void;
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
      
      <div className="flex justify-center gap-2 mb-2">
      {types.map((type) => (
        <Badge key={type} variant="type" type={type} value={type} />
      ))}
    </div>

      
      {/* Divider */}
      <div className="border-t border-gray-700 my-2"></div>
      
      {/* Stats */}
      <div>
        <StatLine label="HP" value={stats.hp} />
        <StatLine label="Attack" value={stats.attack} />
        <StatLine label="Defense" value={stats.defense} />
        <StatLine label="Speed" value={stats.speed} />
      </div>

    </div>
  );
};

export default PokemonCard;