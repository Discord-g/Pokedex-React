import type { baseModel } from "./base";

export interface chainModel {
    species: baseModel;
    evolves_to: chainModel[];
}

export interface evolutionChainModel {
    id: number;
    chain: chainModel; 
}