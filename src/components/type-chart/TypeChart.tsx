import React, { useEffect, useState } from "react";
import type { pokemonTypeSlotModel } from "../../models/pokemon";
import { Loader } from "../loader/Loader";
import typeService from "../../services/typeService";
import './typeChart.scss'

interface myProp {
    pokemonTypes: pokemonTypeSlotModel[],
}

export const TypeChart = (props: myProp) => {
    const { pokemonTypes } = props;
    const [loading, setLoading] = useState(true)

    const [superWeak, setSuperWeak] = useState<string[]>([])
    const [weak, setWeak] = useState<string[]>([])
    const [normal, setNormal] = useState<string[]>([])
    const [resist, setResist] = useState<string[]>([])
    const [superResist, setSuperResist] = useState<string[]>([])
    const [immune, setImmune] = useState<string[]>([])

    const getEffectiveness = async (types: pokemonTypeSlotModel[]) => {
        let typelist = [
            { name: 'normal', effectiveness: 1 },
            { name: 'fighting', effectiveness: 1 },
            { name: 'flying', effectiveness: 1 },
            { name: 'poison', effectiveness: 1 },
            { name: 'ground', effectiveness: 1 },
            { name: 'rock', effectiveness: 1 },
            { name: 'bug', effectiveness: 1 },
            { name: 'ghost', effectiveness: 1 },
            { name: 'steel', effectiveness: 1 },
            { name: 'fire', effectiveness: 1 },
            { name: 'water', effectiveness: 1 },
            { name: 'grass', effectiveness: 1 },
            { name: 'electric', effectiveness: 1 },
            { name: 'psychic', effectiveness: 1 },
            { name: 'ice', effectiveness: 1 },
            { name: 'dragon', effectiveness: 1 },
            { name: 'dark', effectiveness: 1 },
            { name: 'fairy', effectiveness: 1 },
        ]

        try {
            for(const type of types) {
                const result = await typeService.getTypeData(type.type.name)

                if(result) {
                    result.damage_relations.double_damage_from.map((damage) => {
                        typelist.map((typeDamage) => {
                            if(typeDamage.name == damage.name) {
                                typeDamage.effectiveness = typeDamage.effectiveness * 2
                            } 
                        })
                    })

                    result.damage_relations.half_damage_from.map((damage) => {
                        typelist.map((typeDamage) => {
                            if(typeDamage.name == damage.name) {
                                typeDamage.effectiveness = typeDamage.effectiveness * 0.5
                            } 
                        })
                    })

                    result.damage_relations.no_damage_from.map((damage) => {
                        typelist.map((typeDamage) => {
                            if(typeDamage.name == damage.name) {
                                typeDamage.effectiveness = typeDamage.effectiveness * 0
                            } 
                        })
                    })
                }
            }

        } catch {

        } finally {
            typelist.map((damage) => {
                if (damage.effectiveness == 4) {
                    setSuperWeak(superWeak => [...superWeak, damage.name])
                } else  if (damage.effectiveness == 2) {
                    setWeak(weak => [...weak, damage.name])
                } else  if (damage.effectiveness == 0.5) {
                    setResist(resist =>[...resist, damage.name])
                } else  if (damage.effectiveness == 0.25) {
                    setSuperResist(superResist => [...superResist, damage.name])
                } else  if (damage.effectiveness == 0) {
                    setImmune(immune => [...immune, damage.name])
                } else {
                    setNormal(normal => [...normal, damage.name])
                }
            })
            setLoading(false)
        }
    }

    useEffect(() => {
        if(pokemonTypes) {
            setSuperWeak([])
            setWeak([])
            setResist([])
            setSuperResist([])
            setImmune([])
            setNormal([])
            getEffectiveness(pokemonTypes)
        }
    }, [pokemonTypes])

    return (
        <div className="chart-container">
            {loading ? (
                <Loader />
            ) : (
                <div className="chart-body">
                    <section className="title-container">
                        <div>Type Effectiveness</div>
                    </section>
                    {superWeak.length > 0 && (
                        <section className="damage-container">
                            <div className="damage-title">4x Damaged</div>
                            <div className="types">
                                {superWeak.map((effect: string) => (
                                    <div className={`damage-type type-${effect}`}>
                                        {effect}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    <section className="damage-container">
                        <div className="damage-title">2x Damaged</div>
                        <div className="types">
                            {weak.map((effect) => (
                                <div className={`damage-type type-${effect}`}>
                                    {effect}
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="damage-container">
                        <div className="damage-title">1x Damaged</div>
                        <div className="types">
                            {normal.map((effect) => (
                                <div className={`damage-type type-${effect}`}>
                                    {effect}
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="damage-container">
                        <div className="damage-title">1/2x Damaged</div>
                        <div className="types">
                            {resist.map((effect) => (
                                <div className={`damage-type type-${effect}`}>
                                    {effect}
                                </div>
                            ))}
                        </div>
                    </section>
                    {superResist.length > 0 && (
                        <section className="damage-container">
                            <div className="damage-title">1/4x Damaged</div>
                            <div className="types">
                                {superResist.map((effect) => (
                                    <div className={`damage-type type-${effect}`}>
                                        {effect}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {immune.length > 0 && (
                        <section className="damage-container">
                            <div className="damage-title">Immune</div>
                            <div className="types">
                                {immune.map((effect) => (
                                    <div className={`damage-type type-${effect}`}>
                                        {effect}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    )
}