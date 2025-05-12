import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Text from "../components/atoms/Text";
import PokemonEvolutionTree from "@/components/organisms/PokemonEvolutionTree";
import MonsterOfTheDay from "@/components/organisms/MonsterOfTheDay";
import { useTranslation } from "react-i18next";
import { getPokemonIdByName } from "@/services/pokeApi";
import SearchBarWithSuggestions from "@/components/molecules/SearchBarWithSuggestion";


const PokemonEvolutionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState("");
  const [pokemonId, setPokemonId] = useState<number | null>(id ? parseInt(id, 10) : null);

  useEffect(() => {
    if (searchValue.trim() === "") return;

    const fetchId = async () => {
      const resolvedId = await getPokemonIdByName(searchValue.trim().toLowerCase());
      setPokemonId(resolvedId || null);
    };

    fetchId();
  }, [searchValue]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Text className="text-center mb-4" size="xl" color="secondary">
        {t("titles.evolutionschain")}
      </Text>

      <div className="mb-6 text-center">
        <SearchBarWithSuggestions
        onSelect={(name) => setSearchValue(name)}
          placeholder={t("form.search") || "Search Pokémon..."}
        />
      </div>

      {!pokemonId ? (
        <>
          <Text className="text-center mb-4" size="lg" color="danger">
            {t("pokemon.invalid")}
          </Text>
          <MonsterOfTheDay />
        </>
      ) : (
        <PokemonEvolutionTree pokemonId={pokemonId} />
      )}
    </div>
  );
};

export default PokemonEvolutionPage;
