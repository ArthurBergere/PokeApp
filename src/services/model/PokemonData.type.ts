export interface PokemonData {
    image: string;
    id: number;
    name: string;
    height: number;
    weight: number;
    types: {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }[];
    stats: {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    }[];
    sprites: {
      front_default: string;
      other: {
        'official-artwork': {
          front_default: string;
        };
      };
    };
    species: {
      name: string;
      url: string;
    };
  }
  