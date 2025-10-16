import React from "react";
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

    return (
        <div className="pagination-container">
            <button
                disabled={loading || currentPage <= 1}
                onClick={() => setPage(currentPage-1)}
                title="Last"
            >
                <FontAwesomeIcon icon={faAngleLeft} size="lg" />
            </button>
            {!loading && (
                <select
                    disabled={loading} value={currentPage}
                    onChange={(e) => setPage(Number(e.target.value))}
                    title="Select Page"
                >
                    {[...Array(totalPages)].map((val, index) => (
                        <option value={totalPages-index}>{totalPages-index}</option>
                    ))}
                </select>
            )}
            <button
                disabled={loading || currentPage >= totalPages}
                onClick={() => setPage(currentPage+1)}
                title="Next"
            >
                <FontAwesomeIcon icon={faAngleRight} size="lg" />
            </button>
        </div>
    )
}