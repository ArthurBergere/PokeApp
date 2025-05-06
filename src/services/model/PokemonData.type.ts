// On utilise des interfaces ici car les données représentent des objets structurés
// et potentiellement extensible selon les différentes réponses de l’API PokéAPI
export interface PokemonData {
    image: string;
    id: number;
    name: string;
    height: number;
    weight: number;
    types: PokemonType[];
    stats: PokemonStat[];
    sprites: PokemonSprites;
    species: NamedAPIResource;
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
  
