import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Rechercher...",
  onFocus,
  onBlur,
  className = "",
}) => (
  <div className={`relative w-full ${className}`}>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-600 bg-gray-700 text-white 
        placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:border-blue-500 transition duration-200"
    />
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 
      text-gray-400 pointer-events-none">
      <Search className="h-5 w-5" />
    </div>
  </div>
);

export default SearchBar;