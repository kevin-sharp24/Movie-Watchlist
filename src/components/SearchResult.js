import React from "react"

export default function SearchResult({Poster, Title, Ratings, Runtime, Genre, Plot}) {
    return (
        <article className="search-result">
            <img className="search-result--poster" src={Poster}/>
            <div className="search-result--movie-details">
                <div className="search-result--movie-details-top-row">
                    <h2 className="search-result--title">{Title}</h2>
                    <img className="star-icon" src="images/star-icon.png"/>
                    <p className="search-result--rating">{Ratings[0].Value}</p>
                </div>
                <div className="search-result--movie-details-mid-row">
                    <p className="search-result--runtime">{Runtime}</p>
                    <p className="search-result--genre">{Genre}</p>
                    <div className="btn-add-to-watchlist">
                        <img src="images/plus-icon.png" />
                        <p>Watchlist</p>
                    </div>
                </div>
                <p className="search-result--summary">{Plot}</p>
            </div>
        </article>
    )    
}