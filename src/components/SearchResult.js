import React from "react"
import PlusIcon from "../images/plus-icon.png"
import PlusIconDisabled from "../images/plus-icon-disabled.png"
import MinusIcon from "../images/minus-icon.png"
import StarIcon from "../images/star-icon.png"

export default function SearchResult({movieDetails, handleClick, onSearchPage, isOnWatchlist}) {

    return (
        <article className="search-result">
            <img className="search-result--poster" src={movieDetails.Poster} alt={`${movieDetails.Title} poster`}/>
            <div className="search-result--movie-details">
                <div className="search-result--movie-details-top-row">
                    <h2 className="search-result--title">{movieDetails.Title}</h2>
                    <img className="star-icon" src={StarIcon} alt="star rating out of ten"/>
                    {/* substring truncates "/10" from the value of the movie's rating */}
                    <p className="search-result--rating">{movieDetails.Ratings[0] ? movieDetails.Ratings[0].Value.substring(0, 3) : ""}</p>
                </div>
                <div className="search-result--movie-details-mid-row">
                    <p className="search-result--runtime">{movieDetails.Runtime}</p>
                    <p className="search-result--genre">{movieDetails.Genre}</p>
                    { onSearchPage ? 
                        // search page variant
                        <div className={!isOnWatchlist ? "watchlist-btn btn-enabled" : "watchlist-btn"} onClick={!isOnWatchlist ? () => handleClick(movieDetails) : null}>
                            <img src={!isOnWatchlist ? PlusIcon : PlusIconDisabled} alt={!isOnWatchlist ? "click to add this movie to your watchlist" : ""}/>
                            <p>{!isOnWatchlist ? "Watchlist" : "Added"}</p>
                        </div> :
                        // watchlist variant
                        <div className="watchlist-btn btn-enabled" onClick={() => handleClick(movieDetails)}>
                            <img src={MinusIcon} alt="click to remove this movie from your watchlist"/>
                            <p>Remove</p>
                        </div>
                    }
                    
                </div>
                <p className="search-result--summary">{movieDetails.Plot}</p>
            </div>
        </article>
    )    
}