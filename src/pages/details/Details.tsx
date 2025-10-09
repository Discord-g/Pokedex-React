import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { Loader } from "../../components/loader/Loader";
import pokemonSpecieService from "../../services/pokemonSpecieService";
import type { pokemonSpecieModel } from "../../models/pokemonSpecie";
import pokemonService from "../../services/pokemonService";
import type { pokemonAbilitiesModel, pokemonModel, pokemonTypeSlotModel } from "../../models/pokemon";
import { StatsCard } from "../../components/stats-card/StatsCard";
import { TypeChart } from "../../components/type-chart/TypeChart";

export const Details = () => {
    const { specieId } = useParams()
    const [pokemonSpecie, setPokemonSpecie] = useState<pokemonSpecieModel>()
    const [loading, setLoading] = useState(true);

    const [pokemonId, setPokemonId] = useState(0)
    const [pokemon, setPokemon] = useState<pokemonModel>()
    
    const navigate = useNavigate()

    const getSpecie = async (id: string) => {
        try {
            const result = await pokemonSpecieService.getPokemonSpecieData(id)
            if(result) {
                setPokemonSpecie(result)
                setPokemonId(result.id)
            }
        } catch (err) {

        } finally {
        }
    }

    const getPokemon = async (id: string) => {
        try {
            setLoading(true)
            const result = await pokemonService.getPokemonData(id)
            if(result) {
                setPokemon(result)
            }
        } catch (err) {

        } finally {
            setLoading(false)
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
        <>
            <header>
                <button onClick={() => navigate('/')}>Return</button>
            </header>
            <main>
                {loading ? (
                    <Loader />
                ) : (
                    <div>
                        {(pokemonSpecie && pokemon) && (
                            <div>
                                <h1>{pokemonSpecie.name}</h1>
                                <img src={pokemon.sprites.front_default}/>
                                <section>
                                    <StatsCard pokemonStats={pokemon.stats}/>
                                </section>
                                <section>
                                    <div>
                                        {pokemon.types.map((x: pokemonTypeSlotModel) => (<span>{x.type.name}</span>))}
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
                                <section>
                                    <TypeChart pokemonTypes={pokemon.types} />
                                </section>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </>
    )
}