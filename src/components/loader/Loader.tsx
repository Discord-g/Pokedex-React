import React from "react";
import './Loader.scss'
import pokeball from '../../assets/images/PokeballIcon.png'

export const Loader = () => {
    return (
        <div className="loader-container">
            <img src={pokeball} className="loader"/>
        </div>
    )
}