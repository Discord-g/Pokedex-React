import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as star, faVolumeLow } from '@fortawesome/free-solid-svg-icons'
import { faStar as outlineStar } from '@fortawesome/free-regular-svg-icons'
import { Loader } from "../loader/Loader";
import type { pokemonListItemModel } from "../../models/pokemonListItem";
import type { pokemonModel } from "../../models/pokemon";
import type { pokemonSpecieModel } from "../../models/pokemonSpecie";
import pokemonService from "../../services/pokemonService";
import favoritesService from "../../services/favoritesService";
import pokemonSpecieService from "../../services/pokemonSpecieService";
import utils from "../../services/utils";
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
        try {
            setLoading(true)
            const result = await pokemonService.getPokemonData(id)
            if(result) setPokemon(result)

            const resultSpecie = await pokemonSpecieService.getPokemonSpecieData(id)
            if(resultSpecie) setPokemonSpecie(resultSpecie)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const handleFavorite = async () => {
        setLoading(true)
        await favoritesService.handleFavorite(pokemonItem)
        setLoading(false)
        if(postFavorite) postFavorite()
    }

     const playCry = () => {
        var audio = new Audio(pokemon?.cries.latest);
        audio.play();
    }

    useEffect(() => {
        if(pokemonItem.url) {
            const id = utils.getIdFromUrl(pokemonItem.url)

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
                            <section className="card-sprite-container image-container" onClick={() => navigate(`/details/${pokemonSpecie.id}`)}>
                                <img className="pokemon-idle" src={pokemon?.sprites.front_default || utils.getDefaultImage()}/>
                            </section>
                            <section>
                                <div className="title-container">{pokemonSpecie.id} - {pokemonSpecie?.name}</div>
                                <div className="types-container">
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
                                </div>
                                <div className="buttons-container">
                                    <button
                                        onClick={handleFavorite}
                                        title={favoritesService.isFavorite(pokemonItem.name) ? 
                                            "Remove Favorite" : "Add Favorite"
                                        }
                                    >
                                        {favoritesService.isFavorite(pokemonItem.name) ? (
                                            <FontAwesomeIcon icon={star} size="lg" />
                                        ) : (
                                            <FontAwesomeIcon icon={outlineStar} size="lg" />
                                        )}
                                    </button>
                                    <button onClick={playCry} title="Details">
                                        <FontAwesomeIcon icon={faVolumeLow} size="lg" />
                                    </button>
                                </div>
                            </section>
                        </>
                    ) : (
                        <>
                            <section className="card-sprite-no-data image-container">
                                <img src={utils.getDefaultImage()}/>
                            </section>
                            <div className="title-container">No data</div>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}