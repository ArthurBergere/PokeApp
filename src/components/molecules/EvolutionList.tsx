import React from "react";
import Button from "@/components/atoms/Button";

interface EvolutionsListProps {
  list: string[];
  onClick?: (name: string) => void;
}

const EvolutionsList: React.FC<EvolutionsListProps> = ({ list, onClick }) => {
  if (!list.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {list.map((name) => (
        <Button
          key={name}
          variant="primary"
          onClick={() => onClick?.(name)}
          className="capitalize"
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default EvolutionsList;
