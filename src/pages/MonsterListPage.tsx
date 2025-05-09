import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getTypeList } from "@/services/pokeApi";
import MonsterList from "@/components/organisms/MonsterList";
import PokemonCard from "@/components/molecules/PokemonCard";
import Text from "@/components/atoms/Text";
import FilterBar from "@/components/organisms/FilterBar";
import { useFilteredPokemons } from "@/services/pokemonService";

const MonsterListPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

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

  const { results: fullList, loading: loadingFull, error: errorFull } =
    useFilteredPokemons(searchTerm, selectedTypes);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Text variant="h1" size="2xl" className="text-center text-blue-400 mb-8">
        {t("titles.allPokemon")}
      </Text>

      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        types={types}
        selectedTypes={selectedTypes}
        toggleType={toggleType}
        onReset={() => {
          setSearchTerm("");
          setSelectedTypes([]);
        }}
      />

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
                    stats={pokemon.stats}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <MonsterList search="" filterTypes={[]} />
      )}
    </div>
  );
};

export default MonsterListPage;
