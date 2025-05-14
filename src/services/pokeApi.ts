// src/services/pokeApi.ts

import axios from 'axios';
import { PokemonData } from './model/PokemonData.type';
import { Pokemon, formatPokemonData } from './pokemonService'

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export interface PokemonSpecies {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
  evolves_from_species: { name: string } | null;
  evolution_chain: { url: string };
}

export interface EvolutionChain {
  chain: {
    species: { name: string };
    evolves_to: EvolutionChain['chain'][];
  };
}

export async function getEvolutionChain(url: string): Promise<EvolutionChain> {
  const response = await pokeApiClient.get<EvolutionChain>(url);
  return response.data;
}

export interface TypeDamageRelations {
  damage_relations: {
    double_damage_from: Array<{ name: string; url: string }>;
    half_damage_from:   Array<{ name: string; url: string }>;
    no_damage_from:     Array<{ name: string; url: string }>;
  };
}

const pokeApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export async function getPokemonList(
    limit = 20,
    offset = 0
): Promise<PokemonListResponse> {
  const response = await pokeApiClient.get<PokemonListResponse>('/pokemon', {
    params: { limit, offset },
  });
  return response.data;
}

export async function getPokemonData(
    nameOrId: string | number
): Promise<PokemonData> {
  const response = await pokeApiClient.get<PokemonData>(
      `/pokemon/${nameOrId}`
  );
  return response.data;
}
export async function getPokemonFormatted(
  nameOrId: string | number
): Promise<Pokemon> {
  const rawData = await getPokemonData(nameOrId);
  return formatPokemonData(rawData);
}

export async function searchPokemon(
    query: string,
    limit = 100
): Promise<PokemonListResponse> {
  const list = await getPokemonList(limit, 0);
  const filtered = list.results.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
  );
  return { ...list, results: filtered };
}

export async function getPokemonSpecies(
    nameOrId: string | number
): Promise<PokemonSpecies> {
  const response = await pokeApiClient.get<PokemonSpecies>(
      `/pokemon-species/${nameOrId}`
  );
  return response.data;
}

export async function getTypeRelations(
    typeName: string
): Promise<TypeDamageRelations> {
  const response = await pokeApiClient.get<TypeDamageRelations>(
      `/type/${typeName}`
  );
  return response.data;
}

export interface AbilityName {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface AbilityData {
  names: Array<{
    name: string;
    language: { name: string };
  }>;
  effect_entries: Array<{
    effect: string;
    language: { name: string };
  }>;
}

export async function getAbilityData(
    abilityName: string
): Promise<AbilityData> {
  const response = await pokeApiClient.get<AbilityData>(
      `/ability/${abilityName}`
  );
  return response.data;
}

export interface TypeListResponse {
  results: { name: string; url: string }[];
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface GenerationListResponse {
  results: NamedAPIResource[];
}

export interface GenerationDetail {
  pokemon_species: NamedAPIResource[];
}

export async function getTypeList(): Promise<TypeListResponse> {
  const { data } = await pokeApiClient.get<TypeListResponse>('/type');
  return data;
}

// 6) Liste des générations
export async function getGenerationList(): Promise<GenerationListResponse> {
  const { data } = await pokeApiClient.get<GenerationListResponse>('/generation');
  return data;
}

// 7) Détails d'une génération (liste des espèces)
export async function getGenerationDetail(
  generationIdOrName: string | number
): Promise<GenerationDetail> {
  const { data } = await pokeApiClient.get<GenerationDetail>(`/generation/${generationIdOrName}`);
  return data;
}

// 8) Récupère tous les Pokémon d'une génération
export async function getPokemonsByGeneration(
  generationIdOrName: string | number
): Promise<Pokemon[]> {
  const gen = await getGenerationDetail(generationIdOrName);
  const details = await Promise.all(
    gen.pokemon_species.map(species => getPokemonFormatted(species.name))
  );
  return details;
}

export async function getPokemonsByType(typeName: string): Promise<Pokemon[]> {
  // 1) Récupère la liste brute
  const { data } = await pokeApiClient.get<{
    pokemon: { pokemon: { name: string } }[];
  }>(`/type/${typeName}`);

  // 2) Va chercher les détails
  const names = data.pokemon.map(p => p.pokemon.name);
  const details = await Promise.all(names.map(n => getPokemonData(n)));
  return details.map(formatPokemonData);
}

export const getPokemonEvolutionChain = async (
  pokemonId: number
): Promise<Pokemon[]> => {
  try {
    const speciesRes = await fetch(`${API_BASE_URL}/pokemon-species/${pokemonId}`);
    const speciesData = await speciesRes.json();

    const evolutionRes = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionRes.json();

    const namesInChain: string[] = [];

    let current = evolutionData.chain;
    while (current) {
      namesInChain.push(current.species.name);
      current = current.evolves_to[0]; 
    }

    const evolutionPokemon = await Promise.all(
      namesInChain.map((name) => getPokemonFormatted(name))
    );

    return evolutionPokemon;
  } catch (error) {
    console.error("Error fetching evolution chain:", error);
    return [];
  }
};



export async function getPokemonIdByName(name: string): Promise<number | null> {
  try {
    const data = await getPokemonData(name.toLowerCase());
    return data.id;
  } catch (error) {
    console.error("Pokemon not found:", name, error);
    return null;
  }
}