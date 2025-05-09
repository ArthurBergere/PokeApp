import React from "react";

interface MultiSelectFilterProps {
  options: string[];
  selected: string[];
  toggle: (value: string) => void;
  labelMap?: (value: string) => string; // facultatif pour la traduction
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  options,
  selected,
  toggle,
  labelMap = (v) => v,
}) => (
  <div className="flex flex-wrap gap-2">
    {options.map((option) => {
      const isSelected = selected.includes(option);
      return (
        <button
          key={option}
          onClick={() => toggle(option)}
          className={`px-3 py-1 rounded-full border ${
            isSelected
              ? "bg-blue-500 text-white border-transparent"
              : "bg-gray-700 text-gray-300 border-gray-600"
          } hover:opacity-80 transition`}
        >
          {labelMap(option)}
        </button>
      );
    })}
  </div>
);

export default MultiSelectFilter;
