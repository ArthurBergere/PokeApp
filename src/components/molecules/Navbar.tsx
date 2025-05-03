import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import i18n from "../../i18n";
import Button from "../atoms/Button";
import { useTranslation } from "react-i18next";

const navLinks = [
  { key: "navbar.element1", to: "/" },
  { key: "navbar.element2", to: "/pokemons" },
];


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleLanguage = () => {
    const newLanguage = i18n.language === "fr" ? "en" : "fr"; 
    i18n.changeLanguage(newLanguage);
  };
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Titre */}
        <NavLink to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <img src="/logo.webp" alt="logo" className="w-20 h-20" />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
        {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-white hover:text-cyan-400 transition-colors duration-200 ${isActive ? "border-b-2 border-cyan-400 pb-1" : ""}`
              }
            >
              {t(link.key)}
            </NavLink>
          ))}
        </div>

        {/* Lang Switch Button */}
        <Button
          variant="outline"
          onClick={toggleLanguage}
          className="p-1"
          aria-label="Switch language"
        >
          <img
            src={i18n.language === "en" ? "/flags/gb.svg" : "/flags/fr.svg"}
            alt="Switch language"
            className="w-6 h-6"
          />
        </Button>


        {/* Burger Menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 px-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `text-white hover:text-cyan-400 transition-colors ${isActive ? "font-bold" : ""}`
              }
            >
              {t(link.key)} {/* Utilisation de la traduction */}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;