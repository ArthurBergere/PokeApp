import { useState, useEffect, useCallback } from 'react';
import pokemonService, { Pokemon } from '../services/pokemonService';

// Interface pour les paramètres du hook
interface UsePokemonsOptions {
  limit?: number;
  offset?: number;
  initialLoad?: boolean;
}

export const usePokemons = ({ 
  limit = 20, 
  offset = 0, 
  initialLoad = true 
}: UsePokemonsOptions = {}) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentOffset, setCurrentOffset] = useState<number>(offset);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadPokemons = useCallback(async (newOffset?: number) => {
    const offsetToUse = newOffset !== undefined ? newOffset : currentOffset;
    
    try {
      setLoading(true);
      setError(null);
      
      const data = await pokemonService.getPokemons(limit, offsetToUse);
      
      if (offsetToUse > 0) {
        setPokemons(prev => [...prev, ...data]);
      } else {
        setPokemons(data);
      }
      
      setHasMore(data.length === limit);
      
      setCurrentOffset(offsetToUse + limit);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
    } finally {
      setLoading(false);
    }
  }, [limit, currentOffset]);

  useEffect(() => {
    if (initialLoad) {
      loadPokemons(0); // Appelle l’offset 0 au tout début
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadPokemons();
    }
  }, [loading, hasMore, loadPokemons]);

  const refresh = useCallback(() => {
    setCurrentOffset(0);
    loadPokemons(0);
  }, [loadPokemons]);

  return {
    pokemons,
    loading,
    error,
    loadMore,
    refresh,
    hasMore
  };
};

export const usePokemonDetail = (nameOrId: string | number) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const loadPokemon = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await pokemonService.getPokemonDetails(nameOrId);
      setPokemon(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
    } finally {
      setLoading(false);
    }
  }, [nameOrId]);

  useEffect(() => {
    loadPokemon();
  }, [nameOrId, loadPokemon]);

  return {
    pokemon,
    loading,
    error,
    reload: loadPokemon
  };
};

export const useSearchPokemon = () => {
  const [results, setResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [query, setQuery] = useState<string>('');

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      setQuery(searchQuery);
      
      const data = await pokemonService.searchPokemons(searchQuery);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    results,
    loading,
    error,
    search,
    query
  };
};

export default {
  usePokemons,
  usePokemonDetail,
  useSearchPokemon
};