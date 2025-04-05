import { Search } from "lucide-react";
import "./App.css";
import Badge from "./components/atoms/Badge";
import Button from "./components/atoms/Button";
import Input from "./components/atoms/Input";
import Text from "./components/atoms/Text";
import Image from "./components/atoms/Image";
import "./i18n";
import PokemonCard from "./components/molecules/PokemonCard";

function App() {
  const pokemonTypes = ["fire", "flying"];
  const pokemonLevel = 25;
  const pokemonStatus = "active";
  return (
    <div>
      <h1 className="text-blue-400 text-4xl mb-4">
        Bienvenue dans l'App Pokémon
      </h1>
      <p className="text-yellow-400 text-lg">
        Découvrez l'univers des Pokémon et explorez les différentes régions.
      </p>
      <div className="mt-6">
        <button className="bg-yellow-400 hover:bg-red-500 text-black p-3 rounded transition-all duration-300">
          Démarrer l'aventure
        </button>
      </div>
      <div className="mt-8">
        <p className="text-red-500 font-bold text-xl">Alertes Pokéball !</p>
      </div>

      <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center text-blue-400 mb-4">
          Exemple Button Badge
        </h1>

        <div className="flex flex-wrap gap-3 justify-center">
          {/* Affichage des badges pour chaque type */}
          <Button variant="secondary" onClick={() => alert("Secondaire !")}>
            Atome bouton
          </Button>
          <Button variant="primary" onClick={() => alert("Secondaire !")}>
            Atome primary
          </Button>
          <Button variant="outline" onClick={() => alert("Secondaire !")}>
            Atome outline
          </Button>
        </div>
        <h1 className="text-2xl font-bold text-center text-blue-400 mb-4">
          Exemple Atome Badge
        </h1>

        <div className="flex flex-wrap gap-3 justify-center">
          {/* Affichage des badges pour chaque type */}
          <Badge variant="type" value="Fire" type={pokemonTypes} />
          <Badge variant="level" value={pokemonLevel} />
          <Badge variant="status" value={pokemonStatus} />
        </div>


        <h2 className="text-lg font-bold mb-2">Exemple Atome Input</h2>

          {/* Champ normal */}
          <Input variant="text" tPlaceholder="form.username" />

          {/* Champ de mot de passe avec toggle */}
          <Input variant="password" tPlaceholder="form.password" error="form.passwordError" />

          {/* Champ de recherche avec icône à gauche */}
          <Input
            variant="search"
            tPlaceholder="form.search"
            icon={<Search size={18} />}
            iconPosition="left"
          />
           <Text variant="h1" tKey="titles.welcome" size="2xl" bold />
          <Text variant="h2" size="xl" color="primary">Titre secondaire</Text>
          <Text variant="p" tKey="descriptions.home" italic />
          <Text variant="span" color="gray" size="sm">Mini info</Text>

        <Image
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
          alt="Pikachu"
          size="medium"
        />
        <Text variant="span" color="gray" size="sm">Image not found : </Text>
        <Image
          src="https://url-invalide"
          alt="Invalide"
          size="small"
        />



      <PokemonCard
          name="Pikachu"
          image="/path/to/pikachu.png"
          types={["Electric"]}
          stats={{
            hp: 35,
            attack: 55, 
            defense: 40,
            speed: 90
          }}
        />
        </div>


       
    </div>
  );
}

export default App;
