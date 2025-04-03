import "./App.css";
import Badge from "./components/atoms/Badge";
import Button from "./components/atoms/Button";

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
      </div>
    </div>
  );
}

export default App;
