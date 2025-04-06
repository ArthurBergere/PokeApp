export type PokemonCardProps = {
    name: string;
    image: string;
    types: string[]; 
    stats: {
      hp: number;
      attack: number;
      defense: number;
      speed: number;
    };
    onViewDetails?: () => void;
  };