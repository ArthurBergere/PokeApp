import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getTypeList, getGenerationList } from "@/services/pokeApi";
import MonsterList from "@/components/organisms/MonsterList";
import PokemonCard from "@/components/molecules/PokemonCard";
import Text from "@/components/atoms/Text";
import FilterBar from "@/components/organisms/FilterBar";
import { useFilteredPokemons } from "@/services/pokemonService";
import Button from "@/components/atoms/Button";

const PAGE_SIZE = 20;

const MonsterListPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    // état recherche & filtres
    const [searchTerm, setSearchTerm] = useState("");
    const [types, setTypes] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [generations, setGenerations] = useState<string[]>([]);
    const [selectedGeneration, setSelectedGeneration] = useState<string>("");

    // pagination en mode filtré
    const [displayCount, setDisplayCount] = useState(PAGE_SIZE);

    // Charger la liste des types une fois
    useEffect(() => {
        getTypeList().then((data) => {
            setTypes(data.results.map((r) => r.name));
        });
        getGenerationList().then((data) => {
            setGenerations(data.results.map((g) => g.name));
        });
    }, []);

    // reset pagination filtrée dès qu’on change critères ou que la liste complète change
    const { results: fullList, loading: loadingFull, error: errorFull } =
        useFilteredPokemons(searchTerm, selectedTypes, selectedGeneration);
    useEffect(() => {
        setDisplayCount(PAGE_SIZE);
    }, [searchTerm, selectedTypes, selectedGeneration, fullList.length]);

    // fonction pour toggle un type dans le filtre
    const toggleType = (type: string) =>
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );

    const isFiltering = !!searchTerm || selectedTypes.length > 0 || !!selectedGeneration;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Text
                variant="h1"
                size="2xl"
                className="text-center text-blue-400 mb-8"
            >
                {t("titles.allPokemon")}
            </Text>

            <FilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                types={types}
                selectedTypes={selectedTypes}
                toggleType={toggleType}
                generationOption={generations}
                selectedGeneration={selectedGeneration}
                setSelectedGeneration={setSelectedGeneration}
                onReset={() => {
                    setSearchTerm("");
                    setSelectedTypes([]);
                    setSelectedGeneration("");
                }}
            />

            {isFiltering ? (
                // —— MODE FILTRÉ + PAGINATION PAR BOUTON ——
                <div className="space-y-6">
                    {loadingFull && (
                        <div className="flex justify-center">
                            <Text>{t("loading")}</Text>
                        </div>
                    )}
                    {errorFull && (
                        <div className="flex justify-center">
                            <Text color="danger">{errorFull}</Text>
                        </div>
                    )}
                    {!loadingFull && !errorFull && fullList.length === 0 && (
                        <Text className="text-center">
                            {t("titles.allPokemon")}: {t("labels.noResults")}
                        </Text>
                    )}

                    {!loadingFull && fullList.length > 0 && (
                        <>
                            {/* grille paginée */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {fullList
                                    .slice(0, displayCount)
                                    .map((pokemon) => (
                                        <div
                                            key={pokemon.id}
                                            onClick={() =>
                                                navigate(`/pokemons/${pokemon.name}`)
                                            }
                                            className="cursor-pointer transform hover:scale-105 transition-transform"
                                        >
                                            <PokemonCard
                                                name={pokemon.name}
                                                image={pokemon.image}
                                                types={pokemon.types}
                                                stats={{
                                                    hp: pokemon.stats.hp,
                                                    attack: pokemon.stats.attack,
                                                    defense: pokemon.stats.defense,
                                                    speed: pokemon.stats.speed,
                                                }}
                                            />
                                        </div>
                                    ))}
                            </div>

                            {/* bouton Charger plus */}
                            {displayCount < fullList.length && (
                                <div className="flex justify-center mt-6">
                                    <Button
                                        onClick={() =>
                                            setDisplayCount((c) =>
                                                Math.min(c + PAGE_SIZE, fullList.length)
                                            )
                                        }
                                    >
                                        {t("actions.loadMore")}
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            ) : (
                // —— MODE INFINITE‐SCROLL (pas de filtre) ——
                <MonsterList search="" filterTypes={[]} />
            )}
        </div>
    );
};

export default MonsterListPage;