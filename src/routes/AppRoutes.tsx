import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MonsterListPage from "@/pages/MonsterListPage";
import ExemplePage from "@/pages/ExemplePage";
import AboutPage from "@/pages/AboutPage";
import NotFoundPage from "@/pages/NotFoundPage";
import MonsterDetailsPage from "@/pages/MonsterDetailsPage";
import PokemonEvolutionPage from "@/pages/PokemonEvolutionPage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pokemons" element={<MonsterListPage />} />
      <Route path="/pokemons/:id" element={<MonsterDetailsPage />} />
      <Route path="/example" element={<ExemplePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/pokemon/:id/evolution" element={<PokemonEvolutionPage />} />
    </Routes>
  );
};

export default AppRoutes;
