import type { baseModel } from "./base";

export interface typeModel {
    id: number;
    name: number;
    damage_relations: {
        double_damage_from: baseModel[];
        double_damage_to: baseModel[];
        half_damage_from: baseModel[];
        half_damage_to: baseModel[];
        no_damage_from: baseModel[];
        no_damage_to: baseModel[];
    }
}
