import api from "./api";
import type { pokemonModel } from "../models/pokemon";

const getPokemonData = async (id: string):Promise<pokemonModel | null> => {
    const { data } = await api.get(`/pokemon/${id}`)
    return data;
}


export default {
    getPokemonData,
}