import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/components/atoms/Button";

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  defaultLabel: string;
  labelFormatter: (value: string) => string;
  className?: string;
  label?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  defaultLabel,
  labelFormatter,
  className = "",
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const getCurrentLabel = () => {
    if (!value) return defaultLabel;
    return labelFormatter(value);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      )}
      <Button
        variant="outline"
        onClick={toggleDropdown}
        className="flex items-center justify-between gap-2 w-full sm:min-w-40 px-3 py-2 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="truncate">{getCurrentLabel()}</span>
        <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>
      
      {isOpen && (
        <div 
          className="absolute z-50 mt-1 w-full rounded-md bg-gray-800 border border-gray-700 shadow-lg animate-fadeIn"
          role="listbox"
        >
          <div className="max-h-60 overflow-auto py-1 scrollbar-thin scrollbar-thumb-gray-600">
            <button
              className={`w-full text-left px-4 py-2.5 hover:bg-gray-700 transition-colors ${!value ? "bg-gray-700 font-medium" : ""}`}
              onClick={() => handleSelect("")}
              role="option"
              aria-selected={value === ""}
            >
              {defaultLabel}
            </button>
            {options.map((option) => (
              <button
                key={option}
                className={`w-full text-left px-4 py-2.5 hover:bg-gray-700 transition-colors ${
                  value === option ? "bg-gray-700 font-medium" : ""
                }`}
                onClick={() => handleSelect(option)}
                role="option"
                aria-selected={value === option}
              >
                {labelFormatter(option)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;