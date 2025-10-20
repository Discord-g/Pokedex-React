import React from "react";
import type { pokemonStatsModel } from "../../models/pokemon";
import './statsCard.scss'

interface myProp {
    pokemonStats: pokemonStatsModel[],
}

export const StatsCard = (props: myProp) => {
    const { pokemonStats } = props;

    const getWidthStat = (stat: number) => {
        const percentage = (stat * 100) / 300
        return percentage + '%'
    }

    const getColorStat = (stat: number) => {
        let statColor = ''

        if(stat <= 40) {
            statColor = '#ff1800'
        } else if (stat <= 80) {
            statColor = '#ff7e00'
        } else if (stat <= 110) {
            statColor = '#ffd600'
        } else if (stat <= 170) {
            statColor = '#4eff00'
        } else {
            statColor = '#02ffff'
        }

        return statColor
    }

    const getNameStat = (stat: string) => {
        switch(stat) {
            case 'attack':
                return 'atk';
            case 'special-attack':
                return 'sp. atk';
            case 'defense':
                return 'def';
            case 'special-defense':
                return 'sp. def';
            case 'speed':
                return 'spd';
            default:
                return stat
        }
    }

    return (
        <>
            {pokemonStats && (
                <>
                    {pokemonStats.map((pokemonStat: pokemonStatsModel, i) => (
                        <div className="stat-body" key={i}>
                            <section className="stat-name">
                                {getNameStat(pokemonStat.stat.name)}: {pokemonStat.base_stat}
                            </section>
                            <section className="stat-value">
                                <div
                                    className="stat-line"
                                    style={{
                                        width: getWidthStat(pokemonStat.base_stat),
                                        backgroundColor: getColorStat(pokemonStat.base_stat)
                                    }}
                                ></div>
                            </section>
                        </div>
                    ))}
                </>
            )}
        </>
    )
}