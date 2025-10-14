import api from "./api";
import type { evolutionChainModel } from "../models/evolutionChain";

const getEvolutionChain = async (id: string):Promise<evolutionChainModel | null> => {
    const { data } = await api.get(`/evolution-chain/${id}`)
    return data;
}

export default {
    getEvolutionChain
}