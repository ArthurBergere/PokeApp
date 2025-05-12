import React from "react";
import Image from "../atoms/Image";
import Text from "../atoms/Text";
import Badge from "../atoms/Badge";
import StatLine from "../atoms/StatLine";
import { motion } from "framer-motion";

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
  className?: string;
  onCardClick?: () => void;
};

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  image,
  types,
  stats,
  className = "",
  onCardClick,
}) => {
  return (
    <motion.div
      onClick={onCardClick}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(0,255,255,0.3)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`bg-black rounded-lg p-4 max-w-xs cursor-pointer ${className}`}
    >
      {/* Image */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex justify-center mb-4 transition-transform duration-300"
      >
        <Image src={image} alt={name} size="medium" />
      </motion.div>

      {/* Name */}
      <Text
        variant="h2"
        className="text-center text-cyan-400 text-2xl font-bold mb-2"
      >
        {name}
      </Text>

      {/* Types */}
      <div className="flex justify-center gap-2 mb-2">
        {types.map((type) => (
          <Badge key={type} variant="type" type={type} value={""}  />
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
    </motion.div>
  );
};

export default PokemonCard;