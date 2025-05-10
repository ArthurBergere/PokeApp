// On utilise des interfaces ici car les données représentent des objets structurés
// et potentiellement extensible selon les différentes réponses de l’API PokéAPI

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
    // ← Ajoute cette section :
    abilities: Array<{
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        slot: number;
    }>;
}
  

export interface NamedAPIResource {
    name: string;
    url: string;
  }
  
  export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
  }
  
  export interface PokemonType {
    slot: number;
    type: NamedAPIResource;
  }
  
  export interface PokemonSprites {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  }
  
