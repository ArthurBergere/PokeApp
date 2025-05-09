// src/pages/MonsterListPage.tsx

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { searchPokemons, getPokemonsByTypes, Pokemon } from "@/services/pokemonService";
import { getTypeList } from "@/services/pokeApi";
import MonsterList from "../components/organisms/MonsterList";
import PokemonCard from "../components/molecules/PokemonCard";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";

const MonsterListPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [types, setTypes] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    // fullList + loader + erreur
    const [fullList, setFullList] = useState<Pokemon[]>([]);
    const [loadingFull, setLoadingFull] = useState(false);
    const [errorFull, setErrorFull] = useState<string | null>(null);

    // Charger la liste des types
    useEffect(() => {
        getTypeList().then(data => {
            setTypes(data.results.map(r => r.name));
        });
    }, []);

    const toggleType = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    // Quand searchTerm ou selectedTypes change, on remplit fullList
    useEffect(() => {
        // si pas de recherche ni de filtre, on désactive le mode fullList
        if (!searchTerm && selectedTypes.length === 0) {
            setFullList([]);
            setErrorFull(null);
            return;
        }

        setLoadingFull(true);
        setErrorFull(null);

        (async () => {
            try {
                let results: Pokemon[] = [];
                if (selectedTypes.length > 0) {
                    // filtre par types
                    results = await getPokemonsByTypes(selectedTypes);
                    // recherche en plus si besoin
                    if (searchTerm) {
                        results = results.filter(p =>
                            p.name.toLowerCase().includes(searchTerm.toLowerCase())
                        );
                    }
                } else {
                    // que recherche
                    results = await searchPokemons(searchTerm);
                }
                setFullList(results);
            } catch (err: any) {
                setErrorFull(err.message || "Erreur de chargement");
            } finally {
                setLoadingFull(false);
            }
        })();
    }, [searchTerm, selectedTypes]);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Text variant="h1" size="2xl" className="text-center text-blue-400 mb-8">
                {t("titles.allPokemon")}
            </Text>

            {/* Recherche + reset */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder={t("form.search")!}
                    className="flex-1 px-4 py-2 rounded border border-gray-600 bg-gray-800 text-white focus:outline-none"
                />
                <Button
                    variant="secondary"
                    onClick={() => {
                        setSearchTerm("");
                        setSelectedTypes([]);
                    }}
                >
                    {t("filters.all")}
                </Button>
            </div>

            {/* Filtres multi-sélection */}
            <div className="flex flex-wrap gap-2 mb-8">
                {types.map(type => {
                    const isSelected = selectedTypes.includes(type);
                    return (
                        <button
                            key={type}
                            onClick={() => toggleType(type)}
                            className={`px-3 py-1 rounded-full border ${
                                isSelected
                                    ? "bg-blue-500 text-white border-transparent"
                                    : "bg-gray-700 text-gray-300 border-gray-600"
                            } hover:opacity-80 transition`}
                        >
                            {t(`types.${type}`)}
                        </button>
                    );
                })}
            </div>

            {/* Si on est en mode fullList (recherche / filtre) */}
            {(searchTerm || selectedTypes.length > 0) ? (
                <div className="space-y-6">
                    {loadingFull && (
                        <div className="flex justify-center">
                            <Text>Chargement…</Text>
                        </div>
                    )}
                    {errorFull && (
                        <div className="flex justify-center">
                            <Text color="danger">{errorFull}</Text>
                        </div>
                    )}
                    {!loadingFull && !errorFull && fullList.length === 0 && (
                        <Text className="text-center">
                            {t("titles.allPokemon")}: aucune donnée trouvée
                        </Text>
                    )}
                    {!loadingFull && fullList.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {fullList.map(pokemon => (
                                <div
                                    key={pokemon.id}
                                    onClick={() => navigate(`/pokemons/${pokemon.name}`)}
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
                    )}
                </div>
            ) : (
                // Sinon, on passe la main à ton infinite scroll / pagination
                <MonsterList search="" filterTypes={[]} />
            )}
        </div>
    );
};

export default MonsterListPage;