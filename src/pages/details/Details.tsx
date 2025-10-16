import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as star, faAngleLeft, faVolumeLow, faMars, faVenus, faAngleRight, faHouse } from '@fortawesome/free-solid-svg-icons'
import { faStar as outlineStar } from '@fortawesome/free-regular-svg-icons'
import { Loader } from "../../components/loader/Loader";
import pokemonSpecieService from "../../services/pokemonSpecieService";
import utils from '../../services/utils'
import type { pokemonSpecieModel } from "../../models/pokemonSpecie";
import pokemonService from "../../services/pokemonService";
import type { pokemonAbilitiesModel, pokemonModel, pokemonTypeSlotModel } from "../../models/pokemon";
import { StatsCard } from "../../components/stats-card/StatsCard";
import { TypeChart } from "../../components/type-chart/TypeChart";
import './details.scss'
import favoritesService from "../../services/favoritesService";
import { VariationCard } from "../../components/variation-card/VariationCard";
import { EvolutionLine } from "../../components/evolution-line/EvolutionLine";

export const Details = () => {
    const { specieId } = useParams()
    const [pokemonSpecie, setPokemonSpecie] = useState<pokemonSpecieModel>()
    const [ganera, setGanera] = useState('')
    const [isFemale, setIsFemale] = useState(false) 
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

                const genus = result.genera.filter((f) => f.language.name.toLowerCase() == 'en')

                setGanera(genus[0]?.genus || "")
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

    const handleFavorite = async () => {
        setLoadingSpecie(true)
        if(pokemonSpecie) {
            await favoritesService.handleFavorite({
                name: pokemonSpecie.name,
                url: "https://pokeapi.co/api/v2/pokemon-species/" + pokemonSpecie.id + '/'
            })
        }   
        setLoadingSpecie(false)
    }

    const handleSizeString = (size: number) => {
        const sizeAdjust = (size*0.1)
        return +parseFloat(sizeAdjust.toString()).toFixed( 2 );
    }

    const playCry = () => {
        var audio = new Audio(pokemon?.cries.latest);
        audio.play();
    }

    const selectVariation = (pokeId: number) => {
        setPokemonId(pokeId)
    }

    const selectEvolution = (pokeId: number) => {
        navigate(`/details/${pokeId}`)
    }

    const handleNavigate = (direction: string) => {
        if(direction == 'next') {
            if(specieId == '1025') {
                navigate('/details/1')
            } else {
                navigate(`/details/${Number(specieId)+1}`)
            }
        } else {
            if(specieId == '1') {
                navigate('/details/1025')
            } else {
                navigate(`/details/${Number(specieId)-1}`)
            }
        }
    }
    
    useEffect(() => {
        if(specieId) {
            getSpecie(specieId)
        }
    }, [specieId])

     useEffect(() => {
        if(pokemonId) {
            setIsFemale(false)
            getPokemon(pokemonId.toString())
        }
    }, [pokemonId])

    return (
        <main className="main-details">
            <div className="pokedex-container">
                {(loadingSpecie || loadingPokemon) ? (
                    <Loader />
                ) : (
                    <div className="pokedex-body">
                        {(pokemonSpecie && pokemon) ? (
                            <>
                                <section className="pokedex-header">
                                    <div className="name-container">
                                        <div className="specie-name">{pokemonSpecie.id} - {pokemonSpecie.name}</div>
                                        {pokemon.name.toLowerCase() !== pokemonSpecie.name.toLowerCase() && (
                                            <div>{pokemon.name}</div>
                                        )}
                                        <div>{ganera}</div>
                                    </div>
                                    <div className="header-buttons">
                                        <button title="Last" onClick={() => handleNavigate('last')}>
                                            <FontAwesomeIcon icon={faAngleLeft} size="lg" />
                                        </button>
                                        <button title="Home" onClick={() => navigate('/')}>
                                            <FontAwesomeIcon icon={faHouse} size="lg" />
                                        </button>
                                        <button
                                            className="button-favorite"
                                            title={favoritesService.isFavorite(pokemonSpecie.name) ? "Remove Favorite" : "Add Favorite"}
                                            onClick={handleFavorite}
                                        >
                                            {favoritesService.isFavorite(pokemonSpecie.name) ? (
                                                <FontAwesomeIcon icon={star} size="lg" />
                                            ) : (
                                                <FontAwesomeIcon icon={outlineStar} size="lg" />
                                            )}
                                        </button>
                                        <button title="Audio" onClick={playCry}>
                                            <FontAwesomeIcon icon={faVolumeLow} size="lg" />
                                        </button>
                                        <button title="Next" onClick={() => handleNavigate('next')}>
                                            <FontAwesomeIcon icon={faAngleRight} size="lg" />
                                        </button>
                                    </div>
                                </section>
                                <section className="pokedex-section">
                                    <section className="sprite-section">
                                        <div className="image-container detail-main-sprite">
                                            {isFemale ? (
                                                <img className="pokemon-idle" src={pokemon.sprites.front_female}/>
                                            ) : (
                                                <img className="pokemon-idle" src={pokemon.sprites.front_default || utils.getDefaultImage()}/>
                                            )}
                                        </div>
                                        {(pokemonSpecie.has_gender_differences && pokemon.sprites.front_female) && (
                                            <div className="gender-container">
                                                <button
                                                    disabled={!isFemale} className="button-male"
                                                    title="Male"  onClick={() => setIsFemale(!isFemale)}
                                                >
                                                    <FontAwesomeIcon icon={faMars} size="lg" />
                                                </button>
                                                <button
                                                    disabled={isFemale} className="button-female"
                                                    title="Female" onClick={() => setIsFemale(!isFemale)}
                                                >
                                                    <FontAwesomeIcon icon={faVenus} size="lg" />
                                                </button>
                                            </div>
                                        )}
                                    </section>
                                    <section>
                                        <div className="forms-section evolutions-section">
                                            <div className="forms-title">Evolution Line</div>
                                            <EvolutionLine currentSpecieId={Number(specieId) || 0} chosePokemon={selectEvolution} chainUrl={pokemonSpecie.evolution_chain.url} />
                                        </div>
                                        {pokemonSpecie.varieties.length > 1 && (
                                            <div className="forms-section">
                                                <div className="forms-title">Varieties</div>
                                                <div className="variations-container">
                                                    {pokemonSpecie.varieties.map((poke, i) => (
                                                        <div className="variations" key={i}>
                                                            <VariationCard currentPokemonId={pokemonId} pokemonItem={poke.pokemon} choseVariation={selectVariation}/>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </section>
                                </section>
                                <section className="pokedex-section">
                                    <section className="info-container">
                                        <div className="types-container">
                                            {pokemon.types.length > 1 ? (
                                                <>
                                                    <div className={`pokemon-type primary-type-container type-${pokemon.types[0]?.type.name}`}>
                                                        {pokemon.types[0]?.type.name}
                                                    </div>
                                                    <div className={`pokemon-type secondary-type-container type-${pokemon.types[1]?.type.name}`}>
                                                        {pokemon.types[1]?.type.name}
                                                    </div>
                                                </>
                                            ) : (
                                                <div className={`pokemon-type only-type-container type-${pokemon.types[0]?.type.name}`}>
                                                    {pokemon.types[0]?.type.name}
                                                </div>
                                            )}
                                        </div>
                                        <section className="abilities-container">
                                            <div className="abilities-title">Abilities</div>
                                            <div className="abilities">
                                                {pokemon.abilities.map((x: pokemonAbilitiesModel, i) => (<div key={i}>{x.ability.name}</div>))}
                                            </div>
                                        </section>
                                        <div className="size-container">
                                            <div className="size-section">
                                                Height: {handleSizeString(pokemon.height)}m
                                            </div>
                                            <div className="size-section">
                                                Weight: {handleSizeString(pokemon.weight)}Kg
                                            </div>
                                        </div>
                                    </section>
                                    <div className="stats-container">
                                        <StatsCard pokemonStats={pokemon.stats}/>
                                    </div>
                                </section>
                                <section className="typechart-container">
                                    <TypeChart pokemonTypes={pokemon.types} />
                                </section>
                            </>
                        ) : (
                            <>
                                <section className="pokedex-header">
                                    <div className="name-container">
                                        <div className="specie-name">No data</div>
                                    </div>
                                    <div className="header-buttons">
                                        <button title="Home" onClick={() => navigate('/')}>
                                            <FontAwesomeIcon icon={faHouse} size="lg" />
                                        </button>
                                    </div>
                                </section>

                                <section className="pokedex-section">
                                    <section className="sprite-section">
                                        <div className="image-container detail-main-sprite">
                                            <img src={utils.getDefaultImage()}/>
                                        </div>
                                    </section>
                                </section>
                            </>
                        )}
                    </div>
                )}
            </div>
        </main>
    )
}