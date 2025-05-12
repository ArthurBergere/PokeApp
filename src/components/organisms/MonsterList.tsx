// src/components/organisms/MonsterList.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { usePokemons } from "@/hooks/usePokemon";
import PokemonCard from "../molecules/PokemonCard";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

export interface MonsterListProps {
    search: string;
    filterTypes: string[];
}

const MonsterList: React.FC<MonsterListProps> = ({
                                                     search,
                                                     filterTypes,
                                                 }) => {
    const navigate = useNavigate();
    const { pokemons, loading, error, loadMore, hasMore } = usePokemons({
        limit: 20,
    });

    // Filtrer par nom et par types (doit contenir *tous* les types sélectionnés)
    const filtered = pokemons.filter((p) => {
        const byName = p.name.toLowerCase().includes(search.toLowerCase());
        const byTypes =
            filterTypes.length === 0 ||
            filterTypes.every((ft) => p.types.includes(ft));
        return byName && byTypes;
    });

    if (error) {
        return <Text color="danger">{error.message}</Text>;
    }

    return (
        <div className="space-y-6">
            {/* Message si aucun résultat */}
            {!loading && filtered.length === 0 && (
                <Text className="text-center">
                    Aucun Pokémon trouvé
                    {filterTypes.length > 0 ? " pour ces filtres" : ""}
                </Text>
            )}

            {/* Grille de cartes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filtered.map((pokemon) => (
                <PokemonCard
                key={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
                stats={{
                    hp: pokemon.stats.hp,
                    attack: pokemon.stats.attack,
                    defense: pokemon.stats.defense,
                    speed: pokemon.stats.speed,
                }}
                onCardClick={() => navigate(`/pokemons/${pokemon.name.toLowerCase()}`)}
                />
            ))}
            </div>
            {/* Bouton « Charger plus » */}
            {hasMore && !loading && filtered.length > 0 && (
                <div className="flex justify-center mt-6">
                    <Button onClick={loadMore}>Charger plus</Button>
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="flex justify-center mt-4">
                    <Text>Chargement…</Text>
                </div>
            )}
        </div>
    );
};

export default MonsterList;