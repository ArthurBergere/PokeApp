import axios from 'axios';
import { PokemonData } from './model/PokemonData.type';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}


const pokeApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const getPokemonList = async (limit = 20, offset = 0): Promise<PokemonListResponse> => {
  try {
    const response = await pokeApiClient.get<PokemonListResponse>('/pokemon', {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
};

export const getPokemonData = async (nameOrId: string | number): Promise<PokemonData> => {
  try {
    const response = await pokeApiClient.get<PokemonData>(`/pokemon/${nameOrId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching Pokemon details for ${nameOrId}:`, error);
    throw error;
  }
};

export const searchPokemon = async (query: string, limit = 100): Promise<PokemonListResponse> => {
  try {
    const response = await getPokemonList(limit, 0);
    
    const filteredResults = response.results.filter(pokemon => 
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    
    return {
      ...response,
      results: filteredResults,
    };
  } catch (error) {
    console.error(`Error searching Pokemon with query: ${query}`, error);
    throw error;
  }
};

export default {
  getPokemonList,
  getPokemonData,
  searchPokemon,
};