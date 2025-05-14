import React from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import MultiSelectFilter from "../molecules/MultiSelect";
import { X } from "lucide-react";

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  types: string[];
  selectedTypes: string[];
  toggleType: (type: string) => void;
  onReset: () => void;
  generationOption: string[];
  selectedGeneration: string;
  setSelectedGeneration: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  types,
  selectedTypes,
  toggleType,
  onReset,
  generationOption,
  selectedGeneration,
  setSelectedGeneration,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={t("form.search")!}
        />
        <Button
          variant="outline"
          onClick={onReset}
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          {t("filters.reset")}
        </Button>
        <div className="flex items-center gap-2">
          <label className="text-gray-300">{t("filters.generation")}:</label>
          <select
            value={selectedGeneration}
            onChange={e => setSelectedGeneration(e.target.value)}
            className="px-4 py-2 rounded border border-gray-600 bg-gray-800 text-white focus:outline-none"
          >
            <option value="">{t("filters.allGenerations")}</option>
            {generationOption.map(gen => (
              <option key={gen} value={gen}>
                {t(`generations.${gen}`)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <MultiSelectFilter
        options={types}
        selected={selectedTypes}
        toggle={toggleType}
        labelMap={(type) => t(`types.${type}`)}
      />
    </div>
  );
};

export default FilterBar;
