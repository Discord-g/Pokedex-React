import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import './pagination.scss'

interface myProp {
    currentPage: number,
    loading: boolean,
    totalPages: number,
    setPage(page: number):void,
}

export const Pagination = (props: myProp) => {
    const { currentPage, setPage, loading, totalPages } = props;
    const [pages, setPages] = useState(0)

    useEffect(() => {
        setPages(totalPages)
    }, [totalPages])

    return (
        <div className="pagination-container">
            <button
                disabled={loading || currentPage <= 1}
                onClick={() => setPage(currentPage-1)}
                title="Last"
            >
                <FontAwesomeIcon icon={faAngleLeft} size="lg" />
            </button>
            <select
                disabled={loading || pages <= 1} value={currentPage}
                onChange={(e) => setPage(Number(e.target.value))}
                title="Select Page"
            >
                {[...Array(pages)].map((val, index) => (
                    <option value={pages-index}>{pages-index}</option>
                ))}
            </select>
            <button
                disabled={loading || currentPage >= pages}
                onClick={() => setPage(currentPage+1)}
                title="Next"
            >
                <FontAwesomeIcon icon={faAngleRight} size="lg" />
            </button>
        </div>
    )
}