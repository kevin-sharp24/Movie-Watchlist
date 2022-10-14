import React from "react"
import PlusIcon from "../images/plus-icon.png"
import StarIcon from "../images/star-icon.png"

export default function SearchResult(props) {
    console.log(props)
    function addItemToWatchlist() {
        console.log("clicked")
        localStorage.setItem(props.id, JSON.stringify({...props}))
    }

    return (
        <article className="search-result">
            <img className="search-result--poster" src={props.Poster} alt={`${props.Title} poster`}/>
            <div className="search-result--movie-details">
                <div className="search-result--movie-details-top-row">
                    <h2 className="search-result--title">{props.Title}</h2>
                    <img className="star-icon" src={StarIcon} alt="star rating out of ten"/>
                    <p className="search-result--rating">{props.Ratings[0].Value.substring(0, 3)}</p>
                </div>
                <div className="search-result--movie-details-mid-row">
                    <p className="search-result--runtime">{props.Runtime}</p>
                    <p className="search-result--genre">{props.Genre}</p>
                    <div className="btn-add-to-watchlist" onClick={addItemToWatchlist}>
                        <img src={PlusIcon} alt="click to add this movie to your watchlist"/>
                        <p>Watchlist</p>
                    </div>
                </div>
                <p className="search-result--summary">{props.Plot}</p>
            </div>
        </article>
    )    
}