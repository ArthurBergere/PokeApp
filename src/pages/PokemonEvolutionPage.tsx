import React from "react";
import { useParams } from "react-router-dom";
import Text from "../components/atoms/Text";
import PokemonEvolutionTree from "@/components/organisms/PokemonEvolutionTree";
import MonsterOfTheDay from "@/components/organisms/MonsterOfTheDay";
import { useTranslation } from "react-i18next";

const PokemonEvolutionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pokemonId = id ? parseInt(id, 10) : null;
 const { t } = useTranslation();
  if (!pokemonId) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <Text  className="text-center mb-4" size="lg" color="danger">
          {t("pokemon.invalid")}
        </Text>
        <MonsterOfTheDay></MonsterOfTheDay>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Text className="text-center mb-4" size="xl" color="secondary">
        {t("titles.evolutionschain")}
      </Text>
      <PokemonEvolutionTree pokemonId={pokemonId} />
    </div>
  );
};

export default PokemonEvolutionPage;
