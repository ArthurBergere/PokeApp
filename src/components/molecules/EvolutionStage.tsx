import React from "react";
import PokemonCard from "../molecules/PokemonCard";
import Text from "../atoms/Text";
import { Pokemon } from "@/services/pokemonService";

interface EvolutionStageProps {
  pokemon: Pokemon;
  evolutionDetails?: string;
}

const EvolutionStage: React.FC<EvolutionStageProps> = ({
  pokemon,
  evolutionDetails,
}) => (
  <div className="flex flex-col items-center gap-2">
    <PokemonCard
      name={pokemon.name}
      image={pokemon.image}
      types={pokemon.types}
      stats={{
        hp: pokemon.stats.hp,
        attack: pokemon.stats.attack,
        defense: pokemon.stats.defense,
        speed: pokemon.stats.speed,
      }}
    />

    {evolutionDetails && (
      <Text size="sm" color="secondary" italic>
        {evolutionDetails}
      </Text>
    )}
  </div>
);

export default EvolutionStage;
