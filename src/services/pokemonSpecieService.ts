import api from "./api";
import type { pokemonSpecieModel } from "../models/pokemonSpecie";

const getPokemonSpecieData = async (id: string):Promise<pokemonSpecieModel | null> => {
    const { data } = await api.get(`/pokemon-species/${id}`)
    return data;
}

export default {
    getPokemonSpecieData
}