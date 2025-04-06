import { PokemonCardProps } from '../components/propsModel/PokemonCard.type';
import { Pokemon } from '../services/pokemonService';

export const mapPokemonToCardProps = (pokemon: Pokemon): PokemonCardProps => {
    const { name, image, types } = pokemon;
    
    // Extrait uniquement les stats nécessaires pour PokemonCardProps
    const { hp, attack, defense, speed } = pokemon.stats;
    
    return {
      name,
      image,
      types,
      stats: { hp, attack, defense, speed }
    };
  };