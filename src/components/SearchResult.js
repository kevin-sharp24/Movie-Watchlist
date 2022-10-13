import React from "react"
import PlusIcon from "../images/plus-icon.png"
import StarIcon from "../images/star-icon.png"

export default function SearchResult({Poster, Title, Ratings, Runtime, Genre, Plot}) {
    return (
        <article className="search-result">
            <img className="search-result--poster" src={Poster} alt={`${Title} poster`}/>
            <div className="search-result--movie-details">
                <div className="search-result--movie-details-top-row">
                    <h2 className="search-result--title">{Title}</h2>
                    <img className="star-icon" src={StarIcon} alt=""/>
                    <p className="search-result--rating">{Ratings[0].Value}</p>
                </div>
                <div className="search-result--movie-details-mid-row">
                    <p className="search-result--runtime">{Runtime}</p>
                    <p className="search-result--genre">{Genre}</p>
                    <div className="btn-add-to-watchlist">
                        <img src={PlusIcon} alt=""/>
                        <p>Watchlist</p>
                    </div>
                </div>
                <p className="search-result--summary">{Plot}</p>
            </div>
        </article>
    )    
}