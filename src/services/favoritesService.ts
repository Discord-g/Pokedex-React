import type { pokemonListItemModel } from "../models/pokemonListItem"

const storageData = 'pokemon-favorites-list'

const getFavorites = ()=> {
    const data = localStorage.getItem(storageData)
    return data ? JSON.parse(data) : []
}

const isFavorite = (name: string):boolean => {
    const favs = getFavorites()
    const hasFav = favs.filter((x: pokemonListItemModel) => x.name == name)
    return hasFav.length > 0
}

const handleFavorite = (pokemon: pokemonListItemModel) => {
    const favorites = getFavorites()
    if(isFavorite(pokemon.name)) {
        const filteredFav = favorites.filter((x:pokemonListItemModel) => x.name !== pokemon.name)
        localStorage.setItem(storageData, JSON.stringify(filteredFav))
    } else {
        favorites.push(pokemon)
        localStorage.setItem(storageData, JSON.stringify(favorites))
    }
}

export default {
    getFavorites,
    isFavorite,
    handleFavorite
}