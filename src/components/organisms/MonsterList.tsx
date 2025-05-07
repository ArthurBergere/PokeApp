import React from "react";
import { usePokemons } from "@/hooks/usePokemon.ts";
import PokemonCard from "../molecules/PokemonCard";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import { useTranslation } from "react-i18next";

const MonsterList: React.FC = () => {
    const { pokemons, loading, error, loadMore, hasMore } = usePokemons({ limit: 12 });
    const { t } = useTranslation();

    if (loading && pokemons.length === 0) {
        return <Text>Chargement des Pokémon...</Text>;
    }

    if (error) {
        return <Text color="danger">{error.message}</Text>;
    }

    return (
        <div className="flex flex-col gap-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:grid-cols-4">
                {pokemons.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.id}
                        {...{
                            name: pokemon.name,
                            image: pokemon.image,
                            types: pokemon.types,
                            stats: {
                                hp: pokemon.stats.hp,
                                attack: pokemon.stats.attack,
                                defense: pokemon.stats.defense,
                                speed: pokemon.stats.speed,
                            },
                        }}
                    />
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center mt-6">
                    <Button onClick={loadMore}>{t("actions.loadMore")}</Button>
                </div>
            )}
        </div>
    );
};

export default MonsterList;