import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { Loader } from "../../components/loader/Loader";
import pokemonSpecieService from "../../services/pokemonSpecieService";
import type { pokemonSpecieModel } from "../../models/pokemonSpecie";
import pokemonService from "../../services/pokemonService";
import type { pokemonAbilitiesModel, pokemonModel, pokemonTypeSlotModel } from "../../models/pokemon";
import { StatsCard } from "../../components/stats-card/StatsCard";
import { TypeChart } from "../../components/type-chart/TypeChart";
import './details.scss'

export const Details = () => {
    const { specieId } = useParams()
    const [pokemonSpecie, setPokemonSpecie] = useState<pokemonSpecieModel>()
    const [loadingSpecie, setLoadingSpecie] = useState(true);

    const [pokemonId, setPokemonId] = useState(0)
    const [pokemon, setPokemon] = useState<pokemonModel>()
    const [loadingPokemon, setLoadingPokemon] = useState(true);
    
    const navigate = useNavigate()

    const getSpecie = async (id: string) => {
        try {
            setLoadingSpecie(true)
            const result = await pokemonSpecieService.getPokemonSpecieData(id)
            if(result) {
                setPokemonSpecie(result)
                setPokemonId(result.id)
            }
        } catch (err) {

        } finally {
            setLoadingSpecie(false)
        }
    }

    const getPokemon = async (id: string) => {
        try {
            setLoadingPokemon(true)
            const result = await pokemonService.getPokemonData(id)
            if(result) {
                setPokemon(result)
            }
        } catch (err) {

        } finally {
            setLoadingPokemon(false)
        }
    }
    
    useEffect(() => {
        if(specieId) {
            getSpecie(specieId)
        }
    }, [specieId])

     useEffect(() => {
        if(pokemonId) {
            getPokemon(pokemonId.toString())
        }
    }, [pokemonId])

    return (
        <main className="main-details">
            <div className="pokedex-container">
                {(loadingSpecie || loadingPokemon) ? (
                    <Loader />
                ) : (
                    <>
                        {(pokemonSpecie && pokemon) && (
                            <div className="pokedex-body">
                                <section className="pokedex-header">
                                    <div className="name-container">
                                        {pokemonSpecie.name}
                                    </div>
                                    <div>
                                        <button onClick={() => navigate('/')}>Go Back</button>
                                    </div>
                                </section>
                                <section className="pokedex-section">
                                    <div className="image-container">
                                        <img src={pokemon.sprites.front_default}/>
                                    </div>
                                    <div className="stats-container">
                                        <StatsCard pokemonStats={pokemon.stats}/>
                                    </div>
                                </section>
                                <section className="pokedex-section">
                                    <section className="typechart-container">
                                        <TypeChart pokemonTypes={pokemon.types} />
                                    </section>
                                    <section>
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
                                        <div>
                                            {pokemon.abilities.map((x: pokemonAbilitiesModel) => (<span>{x.ability.name}</span>))}
                                        </div>
                                        <div>
                                            <span>Height: {pokemon.height}</span>
                                        </div>
                                        <div>
                                            <span>Weight: {pokemon.weight}</span>
                                        </div>
                                    </section>
                                </section>
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    )
}