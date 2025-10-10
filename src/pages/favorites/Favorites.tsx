import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router"
import { Loader } from "../../components/loader/Loader";
import type { pokemonListItemModel } from "../../models/pokemonListItem";
import { PokeCard } from "../../components/poke-cards/PokeCard";
import favoritesService from "../../services/favoritesService";
import '../../sass/_list.scss'

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
                    <div className="list-container">
                        <div className="itens-container">
                            {currentList.map((item: pokemonListItemModel, index: number) => (
                                <div key={index} className="item">
                                    <PokeCard pokemonItem={item} postFavorite={getList}/>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}