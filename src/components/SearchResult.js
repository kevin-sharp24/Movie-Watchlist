import React from "react"
import PlusIcon from "../images/plus-icon.png"
import StarIcon from "../images/star-icon.png"

export default function SearchResult({id, Title, Poster, Ratings, Runtime, Genre, Plot, handleClick}) {

    const watchlistItemObj = {
        "id": id,
        "Title": Title,
        "Poster": Poster,
        "Ratings": Ratings,
        "Runtime": Runtime,
        "Genre": Genre,
        "Plot": Plot
    }

    return (
        <article className="search-result">
            <img className="search-result--poster" src={Poster} alt={`${Title} poster`}/>
            <div className="search-result--movie-details">
                <div className="search-result--movie-details-top-row">
                    <h2 className="search-result--title">{Title}</h2>
                    <img className="star-icon" src={StarIcon} alt="star rating out of ten"/>
                    <p className="search-result--rating">{Ratings[0] ? Ratings[0].Value.substring(0, 3) : ""}</p>
                </div>
                <div className="search-result--movie-details-mid-row">
                    <p className="search-result--runtime">{Runtime}</p>
                    <p className="search-result--genre">{Genre}</p>
                    <div className="btn-add-to-watchlist" onClick={() => handleClick(watchlistItemObj)}>
                        <img src={PlusIcon} alt="click to add this movie to your watchlist"/>
                        <p>Watchlist</p>
                    </div>
                </div>
                <p className="search-result--summary">{Plot}</p>
            </div>
        </article>
    )    
}