import { Search } from "lucide-react";
import "../i18n";

import Badge from "../components/atoms/Badge";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import Text from "../components/atoms/Text";
import Image from "../components/atoms/Image";
import PokemonCard from "../components/molecules/PokemonCard";
import { usePokemons } from "../hooks/usePokemon";
import { mapPokemonToCardProps } from "../utils/pokemonHelpers";
const HomePage = () => {
    const { pokemons, loading, error, refresh } = usePokemons({ limit: 3 });
    const pokemonTypes = ["fire", "flying"];
    const pokemonLevel = 25;
    const pokemonStatus = "active";
  
    return (
      <div className="p-6">
  
        <h1 className="text-blue-400 text-4xl mb-4">
          Bienvenue dans l'App Pokémon
        </h1>
  
        {/* --- Pokémon depuis l'API --- */}
        <section className="mt-8 mb-8">
          <Text variant="h2" size="xl" color="primary" className="mb-4">
            Pokémon depuis l'API
          </Text>
  
          {loading && (
            <div className="bg-gray-800 p-4 rounded-lg text-white">
              Chargement des Pokémon...
            </div>
          )}
  
          {error && (
            <div className="bg-red-800 p-4 rounded-lg text-white mb-4">
              {error.message}
            </div>
          )}
  
          <div className="flex justify-end mb-4">
            <Button onClick={refresh} variant="outline">🔄 Rafraîchir</Button>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                {...mapPokemonToCardProps(pokemon)}
                onViewDetails={() => alert(`Détails de ${pokemon.name}`)}
              />
            ))}
          </div>
        </section>
  
        {/* --- Section Démo de composants --- */}
        <section className="p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-md mx-auto">
          <Text variant="h2" size="xl" className="text-center text-blue-400 mb-4">
            Exemples de composants
          </Text>
  
          <div className="flex flex-wrap gap-3 justify-center mb-4">
            <Button variant="secondary" onClick={() => alert("Secondaire !")}>
              Bouton secondaire
            </Button>
            <Button variant="primary" onClick={() => alert("Primaire !")}>
              Bouton primaire
            </Button>
            <Button variant="outline" onClick={() => alert("Outline !")}>
              Bouton outline
            </Button>
          </div>
  
          <Text variant="h3" className="mb-2">Badges</Text>
          <div className="flex flex-wrap gap-3 justify-center mb-4">
            <Badge variant="type" value="Fire" type={pokemonTypes} />
            <Badge variant="level" value={pokemonLevel} />
            <Badge variant="status" value={pokemonStatus} />
          </div>
  
          <Text variant="h3" className="mb-2">Inputs</Text>
          <Input variant="text" tPlaceholder="form.username" />
          <Input variant="password" tPlaceholder="form.password" error="form.passwordError" />
          <Input
            variant="search"
            tPlaceholder="form.search"
            icon={<Search size={18} />}
            iconPosition="left"
          />
  
          <Text variant="h3" className="mb-2 mt-4">Text</Text>
          <Text variant="h1" tKey="titles.welcome" size="2xl" bold />
          <Text variant="h2" size="xl" color="primary">Titre secondaire</Text>
          <Text variant="p" tKey="descriptions.home" italic />
          <Text variant="span" color="gray" size="sm">Mini info</Text>
  
          <Text variant="h3" className="mb-2 mt-4">Images</Text>
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            alt="Pikachu"
            size="medium"
          />
          <Image
            src="https://url-invalide"
            alt="Invalide"
            size="small"
          />
        </section>
      </div>
    );
}
export default HomePage;
