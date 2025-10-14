import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Loader } from "../loader/Loader";
import evolutionService from "../../services/evolutionService";
import type { chainModel, evolutionChainModel } from "../../models/evolutionChain";
import { VariationCard } from "../variation-card/VariationCard";
import './evolutionLine.scss'

interface myProp {
    chainUrl: string,
    chosePokemon(pokeId: number):void
}

export const EvolutionLine = (props: myProp) => {
    const { chainUrl, chosePokemon } = props;
    const [loading, setLoading] = useState(true);
    const [line, setLine] = useState<evolutionChainModel>()

    const loadLine = async(id: string) => {
        try {
            setLoading(true)
            const result = await evolutionService.getEvolutionChain(id)
            if(result) setLine(result)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const handleSelect = (pokeId: number) => {
        if(!loading) {
            chosePokemon(pokeId)
        }
    }

    const handleEvolutions = (chains: chainModel[]):React.JSX.Element => {

        if(chains.length > 0) {
            return (
                <>  
                    <div className="evolution-arrow">
                        <FontAwesomeIcon icon={faArrowRight} size="lg" />
                    </div>
                    <>
                        {chains.map((chain) => (
                            <div className="multi-evolve">
                                <div className="evolution-item">
                                    <VariationCard pokemonItem={chain.species} choseVariation={handleSelect} />
                                </div>
                                {handleEvolutions(chain.evolves_to)}
                            </div>
                            
                        ))}
                    </>
                    
                    {/* {chains[0] && (
                        <>
                            {handleEvolutions(chains[0].evolves_to)}
                        </>
                    )} */}
                </>
            )
        } else {
            return (<></>)
        }
    }

    useEffect(() => {
        if(chainUrl) {
            let urlList = chainUrl.split('/')
            urlList.pop()
            const id = urlList.pop()

            if(id) loadLine(id)
        }
    }, [chainUrl])
    
    return (
        <div className="evolutions-container">
            {loading ? (
                <Loader />
            ) : (
                <>
                    {line ? (
                        <>
                            <div className="evolution-item">
                                <VariationCard pokemonItem={line.chain.species} choseVariation={handleSelect} />
                            </div>
                            {handleEvolutions(line.chain.evolves_to)}
                        </>
                    ) : (
                        <div>?</div>
                    )}
                </>
            )}
        </div>
    )
}