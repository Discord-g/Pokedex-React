import React, { useEffect, useState } from "react";
import type { pokemonTypeSlotModel } from "../../models/pokemon";
import { Loader } from "../loader/Loader";
import typeService from "../../services/typeService";

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
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    Type Effectiveness
                    {superWeak.length > 0 && (
                        <div>
                            <span>4x Damaged</span>
                            <div>
                                {superWeak.map((effect: string) => (<span>{effect}</span>))}
                            </div>
                        </div>
                    )}
                    <div>
                        <span>2x Damaged</span>
                        <div>
                            {weak.map((effect) => (<span>{effect}</span>))}
                        </div>
                    </div>
                    <div>
                        <span>1x Damaged</span>
                        <div>
                            {normal.map((effect) => (<span>{effect}</span>))}
                        </div>
                    </div>
                    <div>
                        <span>1/2x Damaged</span>
                        <div>
                            {resist.map((effect) => (<span>{effect}</span>))}
                        </div>
                    </div>
                    {superResist.length > 0 && (
                        <div>
                            <span>1/4x Damaged</span>
                            <div>
                                {superResist.map((effect) => (<span>{effect}</span>))}
                            </div>
                        </div>
                    )}
                    {immune.length > 0 && (
                        <div>
                            <span>Immune</span>
                            <div>
                                {immune.map((effect) => (<span>{effect}</span>))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}