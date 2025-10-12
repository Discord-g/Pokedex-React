import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faMagnifyingGlass, faBroom } from '@fortawesome/free-solid-svg-icons'
import pokeListService from "../../services/pokeListService"
import type { pokemonListItemModel } from "../../models/pokemonListItem"
import { Loader } from "../../components/loader/Loader"
import { PokeCard } from "../../components/poke-cards/PokeCard"
import { Pagination } from "../../components/pagination/Pagination"
import './home.scss'

export const Home = () => {
    const [loading, setLoading] = useState<boolean>(true)

    const [currentList, setCurrentList] = useState<pokemonListItemModel[]>([])  
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)

    const [search, setSearch] = useState<string>('')
    const [isFiltered, setIsFiltered] = useState<boolean>(false)

    const navigate = useNavigate()

    const getList = async (searchParam = search, pageParam = page, filtered = isFiltered) => {
        try {
            setLoading(true)
            let list: pokemonListItemModel[] = []
            let pages = 1

            if(filtered) {
                const { finalList, total } = pokeListService.getBySearch(searchParam, pageParam);
                list = finalList
                pages = total
            } else {
                list = await pokeListService.getPaginatedList(pageParam);
                pages = pokeListService.getTotalPages()
            }

            setCurrentList(list)
            setTotalPages(pages)
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
                <div className="filter-container">
                    <input
                        value={search}
                        className="search-input"
                        onChange={(e) => handleSearchInput(e.target.value)}
                    />
                    <section className="filter-buttons">
                        <button onClick={handleSearch} title="Search">
                            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                        </button>
                        <button onClick={handleClear} title="Clear">
                            <FontAwesomeIcon icon={faBroom} size="lg" />
                        </button>
                        <button onClick={() => navigate('/favorites')} title="Favorites">
                            <FontAwesomeIcon icon={faStar} size="lg" />
                        </button>
                    </section>
                </div>
            </header>
            <main className="main-home">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="list-container">
                        <div className="itens-container">
                            {currentList.map((item: pokemonListItemModel, index: number) => (
                                <div key={index} className="item">
                                    <PokeCard pokemonItem={item}/>
                                </div>
                            ))}
                        </div>
                    </div>

                )}
            </main>
            <footer>
                <Pagination
                    currentPage={page}
                    setPage={changePage}
                    loading={loading}
                    totalPages={totalPages}
                />
            </footer>
        </>
    )
}