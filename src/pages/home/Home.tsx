import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import pokeListService from "../../services/pokeListService"
import type { pokemonListItemModel } from "../../models/pokemonListItem"
import { Loader } from "../../components/loader/Loader"
import { PokeCard } from "../../components/poke-cards/PokeCard"
import { Pagination } from "../../components/pagination/Pagination"

export const Home = () => {
    const [loading, setLoading] = useState<boolean>(true)

    const [currentList, setCurrentList] = useState<pokemonListItemModel[]>([])  
    const [page, setPage] = useState<number>(1)

    const [search, setSearch] = useState<string>('')
    const [isFiltered, setIsFiltered] = useState<boolean>(false)

    const navigate = useNavigate()

    const getList = async (searchParam = search, pageParam = page, filtered = isFiltered) => {
        try {
            setLoading(true)

            if(filtered) {
                const list = pokeListService.getBySearch(searchParam, pageParam);
                setCurrentList(list)
            } else {
                const list = await pokeListService.getPaginatedList(pageParam);
                setCurrentList(list)
            }
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const getAll = async () => {
        await pokeListService.getAll()
    }

    const changePage = (newPage: number) => {
        setPage(newPage)
    }

    const handleSearchInput = (value: string) => {
        setSearch(value.trim())
    }

    const handleSearch = () => {
        if(search) {
            setIsFiltered(true)
            if(page == 1) {
                getList(search, 1, true)
            } else {
                setPage(1)
            }
        }
    }

    const handleClear = () => {
        setSearch('')
        setIsFiltered(false)
        if(page == 1) {
            getList('', 1, false)
        } else {
            setPage(1)
        }
    }

    useEffect(() => {
        getAll()
    },[])

    useEffect(() => {
        getList()
    }, [page])

    return (
        <>
            <header>
                <input
                    value={search}
                    onChange={(e) => handleSearchInput(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <button onClick={handleClear}>Clear</button>
                <button onClick={() => navigate('/favorites')}>Favorites</button>
            </header>
            <main>
                {loading ? (
                    <Loader />
                ) : (
                    <div style={{ display: 'flex', width: '90%', flexWrap: 'wrap' }}>
                        {currentList.map((item: pokemonListItemModel, index: number) => (
                            <div key={index} style={{ width: '30%' }}>
                                <PokeCard pokemonItem={item}/>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <footer>
                <Pagination
                    currentPage={page}
                    setPage={changePage}
                    loading={loading}
                />
            </footer>
        </>
    )
}