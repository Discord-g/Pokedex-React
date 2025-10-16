import React, { useEffect, useState } from "react";
import type { pokemonListItemModel } from "../../models/pokemonListItem";
import type { pokemonModel } from "../../models/pokemon";
import { Loader } from "../loader/Loader";
import pokemonService from "../../services/pokemonService";
import "./variationCard.scss"
import utils from "../../services/utils";

interface myProp {
    currentPokemonId: number,
    pokemonItem: pokemonListItemModel,
    choseVariation(pokeId: number):void
}

export const VariationCard = (props: myProp) => {
    const { pokemonItem, choseVariation, currentPokemonId } = props;
    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState<pokemonModel>()

    const loadPokemon = async(id: string) => {
        try {
            setLoading(true)
            const result = await pokemonService.getPokemonData(id)
            if(result) setPokemon(result)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const handleSelect = () => {
        if(!loading && pokemon?.id && pokemon?.id != currentPokemonId) {
            choseVariation(pokemon.id)
        }
    }

    useEffect(() => {
        if(pokemonItem.url) {
            const id = utils.getIdFromUrl(pokemonItem.url)

            if(id) loadPokemon(id)
        }
    }, [pokemonItem])
    
    return (
        <div
            title={pokemon?.name} className={
                `${pokemon?.id == currentPokemonId ?
                    'variation-container-current-pokemon' : 'variation-container'
                } image-container`} 
                onClick={handleSelect}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {pokemon ? (
                        <img title={pokemon.name} src={pokemon.sprites.front_default || utils.getDefaultImage()}/>
                    ) : (
                        <img src={utils.getDefaultImage()}/>
                    )}
                </>
            )}
        </div>
    )
}