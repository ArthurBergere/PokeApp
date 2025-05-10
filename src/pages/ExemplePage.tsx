import React from "react";
import { Search } from "lucide-react"; 
import Badge from "../components/atoms/Badge";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import Text from "../components/atoms/Text";
import Image from "../components/atoms/Image";
import PokemonEvolutionTree from "@/components/organisms/PokemonEvolutionTree";

const ExemplePage: React.FC = () => {
    const pokemonTypes = ["fire", "flying"];
  return (
    <div className="bg-gray-900 min-h-screen p-8">
      {/* --- Section Démo de composants --- */}
      <section className="p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-4xl mx-auto">
        <Text variant="h2" size="xl" className="text-center text-blue-400 mb-4">
          Component Showcase
        </Text>

        {/* --- Buttons --- */}
        <div className="flex flex-wrap gap-3 justify-center mb-4">
          <Button variant="secondary" onClick={() => alert("Secondary Button clicked!")}>
            Secondary Button
          </Button>
          <Button variant="primary" onClick={() => alert("Primary Button clicked!")}>
            Primary Button
          </Button>
          <Button variant="outline" onClick={() => alert("Outline Button clicked!")}>
            Outline Button
          </Button>
        </div>

        {/* --- Badges --- */}
        <Text variant="h3" className="mb-2">Badges</Text>
        <div className="flex flex-wrap gap-3 justify-center mb-4">
          <Badge variant="type" type={pokemonTypes} value={""} />
          <Badge variant="level" value={""} />
          <Badge variant="status" value={""}  />
        </div>
        <PokemonEvolutionTree pokemonId={1} />
        {/* --- Inputs --- */}
        <Text variant="h3" className="mb-2">Inputs</Text>
        <div className="flex flex-wrap gap-3 justify-center mb-4">
          <Input variant="text" tPlaceholder="form.username" />
          <Input variant="password" tPlaceholder="form.password" error="form.passwordError" />
          <Input
            variant="search"
            tPlaceholder="form.search"
            icon={<Search size={18} />}
            iconPosition="left"
          />
        </div>

        {/* --- Texts --- */}
        <Text variant="h3" className="mb-2">Text Examples</Text>
        <div className="space-y-3">
          <Text variant="h1" tKey="titles.welcome" size="2xl" bold />
          <Text variant="h2" size="xl" color="primary">Secondary Title</Text>
          <Text variant="p" tKey="descriptions.home" italic />
          <Text variant="span" color="gray" size="sm">Mini info</Text>
        </div>

        {/* --- Images --- */}
        <Text variant="h3" className="mb-2 mt-4">Images</Text>
        <div className="space-y-4">
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            alt="Pikachu"
            size="medium"
          />
          <Image
            src="https://url-invalide"
            alt="Invalid Image"
            size="small"
          />
        </div>
      </section>
    </div>
  );
};

export default ExemplePage;
