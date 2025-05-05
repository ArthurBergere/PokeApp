import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import Button from "../atoms/Button";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "fr" ? "en" : "fr";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-6">
          <NavLink to="/" className="hover:text-cyan-400">{t("navbar.element1")}</NavLink>
          <NavLink to="/pokemons" className="hover:text-cyan-400">{t("navbar.element2")}</NavLink>
          <NavLink to="/about" className="hover:text-cyan-400">{t("about.title")}</NavLink>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={toggleLanguage} className="p-1">
            <img
              src={i18n.language === "en" ? "/flags/gb.svg" : "/flags/fr.svg"}
              alt="Switch language"
              className="w-6 h-6"
            />
          </Button>
          <span className="text-sm">&copy; {new Date().getFullYear()} PokeApp</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
