import React from "react";
import Text from "../atoms/Text";
import Badge from "../atoms/Badge";
import { PokemonData } from "../../services/model/PokemonData.type";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface PokemonFavoriteCardProps {
  pokemon: PokemonData;
  creatorName: string;
  onFlip: () => void;
}

const PokemonFavoriteCard: React.FC<PokemonFavoriteCardProps> = ({
  pokemon,
  creatorName,
  onFlip,
}) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ rotateY: 180 }}
      animate={{ rotateY: 0 }}
      exit={{ rotateY: -180 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gray-800 rounded-2xl p-6 flex flex-col text-center shadow-lg w-full h-full"
    >
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-5">
        <button
          onClick={onFlip}
          className="text-gray-400 hover:text-white transition-colors flex items-center text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          {t("Back")}
        </button>
        <Text size="sm" color="gray">
          {creatorName} {t("favorite")}
        </Text>
      </div>

      {/* Image */}
      <div className="bg-[#0d111c] rounded-xl p-4 mb-5 w-full min-h-[192px] flex justify-center items-center">
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="max-w-[120px] max-h-[160px] object-contain"
        />
      </div>

      {/* Name */}
      <Text variant="h3" size="xl" bold className="capitalize mb-3">
        {pokemon.name}
      </Text>

      {/* Types */}
      <div className="mb-5">
        <Badge variant="type" type={pokemon.types.map((t) => t.type.name)} />
      </div>

      {/* Height and Weight */}
      <div className="grid grid-cols-2 gap-4 w-full mb-4">
        <div>
          <Text variant="span" size="sm" color="gray">
            {t("Height")}
          </Text>
          <Text variant="p" size="base" bold>
            {pokemon.height / 10} m
          </Text>
        </div>
        <div>
          <Text variant="span" size="sm" color="gray">
            {t("Weight")}
          </Text>
          <Text variant="p" size="base" bold>
            {pokemon.weight / 10} kg
          </Text>
        </div>
      </div>
    </motion.div>
  );
};

export default PokemonFavoriteCard;
