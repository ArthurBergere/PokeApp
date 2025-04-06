import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pokemons" element={<HomePage />} />
      <Route path="/pokemons/:id" element={<HomePage />} />
      {/* //<Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AppRoutes;
