import axios from "axios";
import { PokemonData } from "./model/PokemonData.type";
import { useEffect, useState } from "react";
import {getGenerationDetail, getPokemonFormatted} from "@/services/pokeApi.ts";

const API_BASE_URL = "https://pokeapi.co/api/v2";
const pokeApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    specialAttack: number;
    specialDefense: number;
  };
}

// 1) transformateur de PokemonData → Pokemon
export function formatPokemonData(pokemonData: PokemonData): Pokemon {
  const statsMap: Record<string, number> = {};
  pokemonData.stats.forEach((s) => {
    statsMap[s.stat.name] = s.base_stat;
  });
  return {
    id: pokemonData.id,
    name: pokemonData.name,
    image:
        pokemonData.sprites.other["official-artwork"].front_default ??
        pokemonData.sprites.front_default ??
        "",
    types: pokemonData.types.map((t) => t.type.name),
    height: pokemonData.height,
    weight: pokemonData.weight,
    abilities: pokemonData.abilities.map((a) => a.ability.name),
    stats: {
      hp: statsMap["hp"] || 0,
      attack: statsMap["attack"] || 0,
      defense: statsMap["defense"] || 0,
      speed: statsMap["speed"] || 0,
      specialAttack: statsMap["special-attack"] || 0,
      specialDefense: statsMap["special-defense"] || 0,
    },
  };
}

// 2) endpoints “list” & “single”
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}
export interface TypeListResponse {
  results: NamedAPIResource[];
}

export async function getPokemonList(
    limit = 20,
    offset = 0
): Promise<PokemonListResponse> {
  const { data } = await pokeApiClient.get<PokemonListResponse>("/pokemon", {
    params: { limit, offset },
  });
  return data;
}

export async function getPokemonData(
    nameOrId: string | number
): Promise<PokemonData> {
  const { data } = await pokeApiClient.get<PokemonData>(
      `/pokemon/${nameOrId}`
  );
  return data;
}

// **AJOUT** : pour que ton hook `usePokemonDetail` puisse l’appeler
export async function getPokemonDetails(
    nameOrId: string | number
): Promise<Pokemon> {
  const raw = await getPokemonData(nameOrId);
  return formatPokemonData(raw);
}

export async function getTypeList(): Promise<TypeListResponse> {
  const { data } = await pokeApiClient.get<TypeListResponse>("/type");
  return data;
}

// pagination classique
export async function getPokemons(
    limit = 20,
    offset = 0
): Promise<Pokemon[]> {
  const { results } = await getPokemonList(limit, offset);
  const details = await Promise.all(results.map((r) => getPokemonData(r.name)));
  return details.map(formatPokemonData);
}

// recherche par nom
export async function searchPokemons(query: string): Promise<Pokemon[]> {
  const { results } = await getPokemonList(800, 0);
  const matches = results
      .filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))
      .map((r) => r.name);
  const details = await Promise.all(matches.map((n) => getPokemonData(n)));
  return details.map(formatPokemonData);
}

// filtres par type
export async function getPokemonsByType(
    typeName: string
): Promise<Pokemon[]> {
  const { data } = await pokeApiClient.get<{
    pokemon: { pokemon: NamedAPIResource }[];
  }>(`/type/${typeName}`);
  const names = data.pokemon.map((p) => p.pokemon.name);
  const details = await Promise.all(names.map((n) => getPokemonData(n)));
  return details.map(formatPokemonData);
}

export async function getPokemonsByTypes(
    typeNames: string[]
): Promise<Pokemon[]> {
  const lists = await Promise.all(typeNames.map((t) => getPokemonsByType(t)));
  const merged = lists.flat();
  // unique par id
  const unique = merged.reduce<Pokemon[]>((acc, p) => {
    if (!acc.some((x) => x.id === p.id)) acc.push(p);
    return acc;
  }, []);
  return unique;
}

export async function getTypeRelations(
    typeName: string
): Promise<{
  damage_relations: {
    double_damage_from: NamedAPIResource[];
    half_damage_from: NamedAPIResource[];
    no_damage_from: NamedAPIResource[];
  };
}> {
  const { data } = await pokeApiClient.get(`/type/${typeName}`);
  return data;
}

export interface GenerationListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}
export async function getGenerationList(): Promise<NamedAPIResource[]> {
  const { data } = await pokeApiClient.get<GenerationListResponse>("/generation");
  return data.results;
}

interface PokemonSpeciesFull {
  varieties: { is_default: boolean; pokemon: NamedAPIResource }[];
}
export async function getPokemonsByGeneration(
    generationIdOrName: string | number
): Promise<Pokemon[]> {
  const gen = await getGenerationDetail(generationIdOrName);
  const speciesNames = gen.pokemon_species.map(s => s.name);

  const pokemons = await Promise.all(
      speciesNames.map(async (speciesName) => {
        const speciesData = await pokeApiClient
            .get<PokemonSpeciesFull>(`/pokemon-species/${speciesName}`)
            .then(res => res.data);

        const defaultVariety = speciesData.varieties.find(v => v.is_default);
        const pokeName = defaultVariety
            ? defaultVariety.pokemon.name
            : speciesName;

        return getPokemonFormatted(pokeName);
      })
  );

  return pokemons;
}

export const useFilteredPokemons = (
    searchTerm: string,
    selectedTypes: string[],
    selectedGeneration: string
) => {
  const [results, setResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si aucun filtre, on vide
    if (!searchTerm && selectedTypes.length === 0 && !selectedGeneration) {
      setResults([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    (async () => {
      try {
        let list: Pokemon[] = [];

        if (selectedGeneration) {
          // 1) on récupère toute la gen
          list = await getPokemonsByGeneration(selectedGeneration);
        } else if (selectedTypes.length > 0) {
          // 2) sinon par types
          list = await getPokemonsByTypes(selectedTypes);
        } else {
          // 3) sinon par nom
          list = await searchPokemons(searchTerm);
        }

        // 4) on applique en mémoire le reste des filtres
        if (selectedTypes.length > 0) {
          list = list.filter(p =>
              selectedTypes.every(t => p.types.includes(t))
          );
        }
        if (searchTerm) {
          list = list.filter(p =>
              p.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setResults(list);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    })();
  }, [searchTerm, selectedTypes, selectedGeneration]);

  return { results, loading, error };
};

export default {
  getPokemons,
  getPokemonData,
  getPokemonDetails,
  getTypeList,
  searchPokemons,
  getPokemonsByType,
  getPokemonsByTypes,
  getTypeRelations,
  getGenerationList,
  getPokemonsByGeneration,
};