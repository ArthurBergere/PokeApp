import React from "react";
import { X } from "lucide-react";

interface MultiSelectFilterProps {
  options: string[];
  selected: string[];
  toggle: (option: string) => void;
  labelMap: (option: string) => string;
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  options,
  selected,
  toggle,
  labelMap,
}) => {

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              onClick={() => toggle(option)}
              className={`
                inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium
                transition-all duration-200 border border-gray-600
                ${isSelected 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"}
              `}
              aria-pressed={isSelected}
            >
              {labelMap(option)}
              {isSelected && (
                <X 
                  className="w-3 h-3 ml-1 opacity-80" 
                  aria-label={`Remove ${labelMap(option)} filter`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MultiSelectFilter;