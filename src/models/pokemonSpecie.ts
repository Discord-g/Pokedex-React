import type { baseModel } from "./base";

interface pokemonVarietieModel {
    is_default: boolean;
    pokemon: baseModel;
}

interface pokemonGaneraModel {
    genus: string;
    language: baseModel;
}

export interface pokemonSpecieModel {
    id: number;
    name: string;
    has_gender_differences: boolean;
    varieties: pokemonVarietieModel[];
    genera: pokemonGaneraModel[];
    evolution_chain: {
        url: string;
    }
}