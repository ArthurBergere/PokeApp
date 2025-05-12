// src/components/molecules/SearchBarWithSuggestions.tsx
import React, { useState, useEffect } from "react";
import { searchPokemon } from "@/services/pokeApi";
import SearchBar from "./SearchBar";

interface Suggestion {
  name: string;
}

interface SearchBarWithSuggestionsProps {
  onSelect: (name: string) => void;
  placeholder?: string;
}

const SearchBarWithSuggestions: React.FC<SearchBarWithSuggestionsProps> = ({ onSelect, placeholder }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const result = await searchPokemon(query, 100);
      setSuggestions(result.results.slice(0, 10)); // limiter pour performance
      setShowDropdown(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (name: string) => {
    setQuery(name);
    setShowDropdown(false);
    onSelect(name);
  };

  return (
    <div className="relative">
      <SearchBar
            value={query}
            onChange={(val) => setQuery(val)}
            placeholder={placeholder}
            onFocus={() => query.length > 1 && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-gray-700 border border-gray-600 rounded mt-1 max-h-60 overflow-auto">
          {suggestions.map((sugg) => (
            <li
              key={sugg.name}
              className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
              onClick={() => handleSelect(sugg.name)}
            >
              {sugg.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBarWithSuggestions;
