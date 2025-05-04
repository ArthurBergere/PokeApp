import React, { useEffect, useState } from "react";
import Text from "@/components/atoms/Text";
import Image from "@/components/atoms/Image";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { getPokemonData } from "@/services/pokeApi"; 
import { PokemonData } from "@/services/model/PokemonData.type";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const MonsterOfTheDay: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);

  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 151) + 1; // 1st gen
    const data = await getPokemonData(randomId);
    setPokemon(data);
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  if (!pokemon) return null;

  return (
    <div className="bg-[#141a2a] rounded-2xl shadow-lg p-6 w-full max-w-xs mx-auto text-center">
      <Text
        variant="h2"
        size="lg"
        color="gray"
        bold
        className="mb-4"
      >
        {t("titles.monsterOfTheDay")}
      </Text>

      <div className="bg-[#0d111c] rounded-xl p-2 mb-4 flex items-center justify-center">
        <Button 
          variant="outline" 
          className="p-0 border-0 w-full h-full flex items-center justify-center hover:bg-transparent"
          onClick={() => navigate(`/pokemons/${pokemon.id}`)}
        >
          <div className="flex items-center justify-center w-full h-full">
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt={pokemon.name}
              size="medium"
              className="rounded-xl"
            />
          </div>
        </Button>
      </div>

      <Text variant="h3" size="base" bold className="capitalize mb-2">
        {pokemon.name}
      </Text>

      <div className="flex justify-center mb-4">
        <Badge variant="type" type={pokemon.types.map(t => t.type.name)} value={""} />
      </div>
    </div>
  );
};

export default MonsterOfTheDay;