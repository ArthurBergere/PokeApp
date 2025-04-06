import { getPokemonData, getPokemonList, searchPokemon } from '../services/pokeApi';
import { PokemonData } from './model/PokemonData.type';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    specialAttack: number;
    specialDefense: number;
  };
}

const formatPokemonData = (pokemonData: PokemonData): Pokemon => {
  const statsMap: Record<string, number> = {};
  pokemonData.stats.forEach(stat => {
    statsMap[stat.stat.name] = stat.base_stat;
  });

  return {
    id: pokemonData.id,
    name: pokemonData.name,
    image: pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default,
    types: pokemonData.types.map(type => type.type.name),
    stats: {
      hp: statsMap['hp'] || 0,
      attack: statsMap['attack'] || 0,
      defense: statsMap['defense'] || 0,
      speed: statsMap['speed'] || 0,
      specialAttack: statsMap['special-attack'] || 0,
      specialDefense: statsMap['special-defense'] || 0,
    }
  };
};

export const getPokemons = async (limit = 20, offset = 0): Promise<Pokemon[]> => {
  try {
    const { results } = await getPokemonList(limit, offset);
    
    const pokemonDetailsPromises = results.map(result => getPokemonData(result.name));
    const pokemonDetails = await Promise.all(pokemonDetailsPromises);
    
    return pokemonDetails.map(formatPokemonData);
  } catch (error) {
    console.error('Error in getPokemons service:', error);
    throw error;
  }
};

export const getPokemonDetails = async (nameOrId: string | number): Promise<Pokemon> => {
  try {
    const pokemonData = await getPokemonData(nameOrId);
    return formatPokemonData(pokemonData);
  } catch (error) {
    console.error(`Error in getPokemonDetails service for ${nameOrId}:`, error);
    throw error;
  }
};

export const searchPokemons = async (query: string): Promise<Pokemon[]> => {
  try {
    const { results } = await searchPokemon(query);
    
    if (results.length === 0) {
      return [];
    }
    
    const pokemonDetailsPromises = results.map(result => getPokemonData(result.name));
    const pokemonDetails = await Promise.all(pokemonDetailsPromises);
    
    return pokemonDetails.map(formatPokemonData);
  } catch (error) {
    console.error(`Error in searchPokemons service for query: ${query}`, error);
    throw error;
  }
};

export default {
  getPokemons,
  getPokemonDetails,
  searchPokemons,
};