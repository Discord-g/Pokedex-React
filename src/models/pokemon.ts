import type { baseModel } from "./base";

interface pokemonSpritesModel {
    front_default: string;
    front_female?: string;
}

export interface pokemonTypeSlotModel {
    slot: number;
    type: baseModel
}

export interface pokemonAbilitiesModel {
    slot: number;
    is_hidden: boolean;
    ability: baseModel;
}

export interface pokemonStatsModel {
    base_stat: number;
    effort: number;
    stat: baseModel
}

export interface pokemonModel {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: pokemonSpritesModel;
    types: pokemonTypeSlotModel[];
    abilities: pokemonAbilitiesModel[];
    stats: pokemonStatsModel[];
    cries: {
        latest: string;
        legacy: string;
    }
}