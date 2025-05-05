import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MonsterListPage from "@/pages/MonsterListPage.tsx";
import ExemplePage from "@/pages/ExemplePage";
import AboutPage from "@/pages/AboutPage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pokemons" element={<MonsterListPage />} />
      <Route path="/pokemons/:id" element={<HomePage />} />
      <Route path="/example" element={<ExemplePage />} />
      <Route path="/about" element={<AboutPage />} />
      {/* //<Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AppRoutes;
