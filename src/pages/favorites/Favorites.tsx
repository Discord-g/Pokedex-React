import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router"
import { Loader } from "../../components/loader/Loader";
import type { pokemonListItemModel } from "../../models/pokemonListItem";
import { PokeCard } from "../../components/poke-cards/PokeCard";
import favoritesService from "../../services/favoritesService";

export const Favorites = () => {
    const [loading, setLoading] = useState(true);

    const [currentList, setCurrentList] = useState<pokemonListItemModel[]>([])

    const navigate = useNavigate()

    const getList = () => {
        setLoading(true)

        const result = favoritesService.getFavorites()
        setCurrentList(result)

        setLoading(false)
    }

    useEffect(() => {
        getList()
    }, [])
    
    return (
        <>
            <header>
                <button onClick={() => navigate('/')}>Return</button>
            </header>
            <main>
                {loading ? (
                    <Loader />
                ) : (
                    <div style={{ display: 'flex', width: '90%', flexWrap: 'wrap' }}>
                        {currentList.map((item: pokemonListItemModel, index: number) => (
                            <div key={index} style={{ width: '30%' }}>
                                <PokeCard pokemonItem={item} postFavorite={getList}/>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </>
    )
}