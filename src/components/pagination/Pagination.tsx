import React from "react";

interface myProp {
    currentPage: number,
    loading: boolean,
    setPage(page: number):void,
}

export const Pagination = (props: myProp) => {
    const { currentPage, setPage, loading } = props;

    return (
        <div>
            <button disabled={loading || currentPage <= 1} onClick={() => setPage(currentPage-1)}>{'<'}</button>
            <button disabled={loading} onClick={() => setPage(currentPage+1)}>{'>'}</button>
        </div>
    )
}