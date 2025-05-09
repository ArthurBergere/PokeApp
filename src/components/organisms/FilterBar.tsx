import React from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import MultiSelectFilter from "../molecules/MultiSelect";

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  types: string[];
  selectedTypes: string[];
  toggleType: (type: string) => void;
  onReset: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  types,
  selectedTypes,
  toggleType,
  onReset,
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
        <Button variant="secondary" onClick={onReset}>
          {t("filters.all")}
        </Button>
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
