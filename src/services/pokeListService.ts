import type { pokemonListItemModel } from "../models/pokemonListItem";
import api from "./api";

let allPokemon:pokemonListItemModel[] = [];

const getPaginatedList = async (page: number):Promise<pokemonListItemModel[]> => {
    const { data } = await api.get(`/pokemon-species/?limit=21&offset=${21*(page-1)}`)
    if(data.results) return data.results;

    return [];
}

const getAll = async () => {
    if(allPokemon.length <= 0) {
        const { data } = await api.get(`/pokemon-species/?limit=100000&offset=0`)
        if(data.results) allPokemon = data.results;
    }
}

const getTotalPages = () => {
    const quantity = allPokemon.length
    return Math.ceil(quantity / 21);
}

const getBySearch = (search: string, page: number) => {
    const query = search.toLowerCase()
    const filtered: pokemonListItemModel[] = allPokemon.filter((pokemon: pokemonListItemModel) =>
        pokemon.name.toLowerCase().includes(query)
    )

    let total = 1
    let finalList: pokemonListItemModel[] = []

    if(filtered.length <= 0) return { finalList, total }

    total = Math.ceil(filtered.length / 21)

    const startList = 21*(page-1)
    let endList = startList + 21
    if(endList > filtered.length) endList = filtered.length

    for(let index = startList; index < endList; index++) {
        const item = filtered[index]
        if(item) finalList.push(item)
    }

    return { finalList, total }
}

export default {
    getPaginatedList,
    getAll,
    getBySearch,
    getTotalPages
}