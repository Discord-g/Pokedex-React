import React from "react";
import type { pokemonStatsModel } from "../../models/pokemon";

interface myProp {
    pokemonStats: pokemonStatsModel[],
}

export const StatsCard = (props: myProp) => {
    const { pokemonStats } = props;

    return (
        <div>
            {pokemonStats && (
                <>
                    {pokemonStats.map((pokemonStat: pokemonStatsModel) => (
                        <div>
                            {pokemonStat.stat.name}: {pokemonStat.base_stat}
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}