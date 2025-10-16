import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { Loader } from "../../components/loader/Loader";
import type { pokemonListItemModel } from "../../models/pokemonListItem";
import { PokeCard } from "../../components/poke-cards/PokeCard";
import favoritesService from "../../services/favoritesService";
import '../../sass/_list.scss'
import utils from "../../services/utils";

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
                <button disabled={loading} title="Return" onClick={() => navigate('/')}>
                    <FontAwesomeIcon icon={faAngleLeft} size="lg" />
                </button>
            </header>
            <main>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        {currentList.length > 0 ? (
                            <div className="list-container">
                                {currentList.map((item: pokemonListItemModel, index: number) => (
                                    <div key={index} className="item">
                                        <PokeCard pokemonItem={item} postFavorite={getList}/>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-data-container">
                                <img src={utils.getDefaultImage()}/>
                                <div>No data</div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </>
    )
}