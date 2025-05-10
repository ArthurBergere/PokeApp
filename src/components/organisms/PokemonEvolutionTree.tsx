import React, { useEffect, useState } from "react";
import EvolutionStage from "../molecules/EvolutionStage";
import EvolutionArrow from "../molecules/EvolutionArrow";
import { getPokemonEvolutionChain } from "@/services/pokeApi";
import { Pokemon } from "@/services/pokemonService";

interface PokemonEvolutionTreeProps {
  pokemonId: number;
}

const PokemonEvolutionTree: React.FC<PokemonEvolutionTreeProps> = ({ pokemonId }) => {
  const [evolutionChain, setEvolutionChain] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvolution = async () => {
      setIsLoading(true);
      try {
        const chain = await getPokemonEvolutionChain(pokemonId);
        setEvolutionChain(chain);
      } catch (err) {
        console.error("Failed to fetch evolution chain:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvolution();
  }, [pokemonId]);

  if (isLoading) {
    return <div className="text-center text-gray-500">Chargement de l'évolution...</div>;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {evolutionChain.map((pokemon, index) => (
        <React.Fragment key={pokemon.id}>
          <EvolutionStage pokemon={pokemon} />
          {index < evolutionChain.length - 1 && <EvolutionArrow />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PokemonEvolutionTree;
