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

export async function getTypeList(): Promise<TypeListResponse> {
  const { data } = await pokeApiClient.get<TypeListResponse>('/type');
  return data;
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

export default {
  getPokemonList,
  getPokemonData,
  searchPokemon,
  getPokemonSpecies,
  getTypeRelations,
};