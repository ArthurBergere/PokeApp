import React from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import MultiSelectFilter from "../molecules/MultiSelect";
import Dropdown from "../molecules/Dropdown";
import { X, Filter } from "lucide-react";

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
  const hasActiveFilters = searchTerm || selectedTypes.length > 0 || selectedGeneration;

  return (
    <div className="bg-gray-850 rounded-lg border border-gray-700 p-4 shadow-md mb-8">
      <div className="space-y-5">
        {/* Search and Filters Row */}
        <div className="flex flex-col lg:flex-row gap-3 lg:items-end">
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={t("form.search")!}
              className="w-full"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Dropdown
              options={generationOption}
              value={selectedGeneration}
              onChange={setSelectedGeneration}
              defaultLabel={t("filters.allGenerations")}
              labelFormatter={(gen) => t(`generations.${gen}`)}
              label={t("filters.generation")}
              className="w-full sm:w-auto"
            />
            
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={onReset}
                className="flex items-center justify-center gap-2 sm:self-end"
              >
                <X className="w-4 h-4" />
                <span className="whitespace-nowrap">{t("filters.reset")}</span>
              </Button>
            )}
          </div>
        </div>
        
        {/* Types Filter Section */}
        <div className="pt-1">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-4 h-4 text-blue-400" />
            <h3 className="font-medium text-gray-200">{t("filters.typeFilters")}</h3>
          </div>
          <MultiSelectFilter
            options={types}
            selected={selectedTypes}
            toggle={toggleType}
            labelMap={(type) => t(`types.${type}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;