import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { pokemonListItemModel } from "../../models/pokemonListItem";
import type { pokemonModel, pokemonTypeSlotModel } from "../../models/pokemon";
import type { pokemonSpecieModel } from "../../models/pokemonSpecie";
import { Loader } from "../loader/Loader";
import pokemonService from "../../services/pokemonService";
import favoritesService from "../../services/favoritesService";
import pokemonSpecieService from "../../services/pokemonSpecieService";
import "./pokeCard.scss"

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
        <div className="card-container">
            {loading ? (
                <Loader />
            ) : (
                <div className="card-body">
                    {pokemon && pokemonSpecie ? (
                        <>
                            <section className="image-container">
                                <img src={pokemon?.sprites.front_default}/>
                            </section>
                            <div className="title-container">{pokemonSpecie.id} - {pokemonSpecie?.name}</div>
                            <section className="types-container">
                                {pokemon.types.length > 1 ? (
                                    <>
                                        <div className={`primary-type type-container type-${pokemon.types[0]?.type.name}`}>
                                            {pokemon.types[0]?.type.name}
                                        </div>
                                        <div className={`secondary-type type-container type-${pokemon.types[1]?.type.name}`}>
                                            {pokemon.types[1]?.type.name}
                                        </div>
                                    </>
                                ) : (
                                    <div className={`only-type type-container type-${pokemon.types[0]?.type.name}`}>
                                        {pokemon.types[0]?.type.name}
                                    </div>
                                )}
                            </section>
                            <section className="buttons-container">
                                <button
                                    onClick={handleFavorite}
                                >
                                    {favoritesService.isFavorite(pokemonItem.name)  ? "Remove Favorite" : "Add Favorite"}
                                </button>
                                <button onClick={() => navigate(`/details/${pokemonSpecie.id}`)}>Details</button>
                            </section>
                        </>
                    ) : (
                        <div>No data</div>
                    )}
                </div>
            )}
        </div>
    )
}