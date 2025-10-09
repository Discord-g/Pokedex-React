import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { pokemonListItemModel } from "../../models/pokemonListItem";
import type { pokemonModel, pokemonTypeSlotModel } from "../../models/pokemon";
import { Loader } from "../loader/Loader";
import pokemonService from "../../services/pokemonService";
import type { pokemonSpecieModel } from "../../models/pokemonSpecie";
import favoritesService from "../../services/favoritesService";
import pokemonSpecieService from "../../services/pokemonSpecieService";

interface myProp {
    pokemonItem: pokemonListItemModel,
    postFavorite?():void
}

export const PokeCard = (props: myProp) => {
    const { pokemonItem, postFavorite } = props;
    const [loading, setLoading] = useState(true);

    const [pokemon, setPokemon] = useState<pokemonModel>()
    const [pokemonSpecie, setPokemonSpecie] = useState<pokemonSpecieModel>()

    const navigate = useNavigate()

    const loadPokemon = async(id: string) => {
        setLoading(true)
        const result = await pokemonService.getPokemonData(id)
        if(result) setPokemon(result)

        const resultSpecie = await pokemonSpecieService.getPokemonSpecieData(id)
        if(resultSpecie) setPokemonSpecie(resultSpecie)
        setLoading(false)
    }

    const handleFavorite = async () => {
        setLoading(true)
        await favoritesService.handleFavorite(pokemonItem)
        setLoading(false)
        if(postFavorite) postFavorite()
    }

    useEffect(() => {
        if(pokemonItem.url) {
            let urlList = pokemonItem.url.split('/')
            urlList.pop()
            const id = urlList.pop()

            if(id) loadPokemon(id)
        }
    }, [pokemonItem])
    
    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    {pokemon && pokemonSpecie ? (
                        <>
                            <img src={pokemon?.sprites.front_default}/>
                            <h3>{pokemonSpecie?.name}</h3>
                            <div>
                                <button
                                    onClick={handleFavorite}
                                >
                                    {favoritesService.isFavorite(pokemonItem.name)  ? "Remove Favorite" : "Add Favorite"}
                                </button>
                                <div>
                                    {pokemon.types.map((x: pokemonTypeSlotModel) => (<span>{x.type.name}</span>))}
                                </div>
                            </div>
                            <button onClick={() => navigate(`/details/${pokemonSpecie.id}`)}>Details</button>
                        </>
                    ) : (
                        <div>No data</div>
                    )}
                </div>
            )}
        </div>
    )
}