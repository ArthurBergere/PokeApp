import './App.css';
import Button from './components/atoms/Button';

function App() {
  return (
    <div>
      <h1 className="text-blue-400 text-4xl mb-4">Bienvenue dans l'App Pokémon</h1>
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
  );
}

export default App;

