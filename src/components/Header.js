import React from "react"
import {Link} from "react-router-dom"

export default function Header({onSearchPage}) {
    
    return (
        <header>
            <div className="content-fit-width">
                <h1>{onSearchPage ? "Find your film" : "My Watchlist"}</h1>
                <Link 
                    id="header--nav-link" 
                    to={onSearchPage ? "/watchlist" : "/"}
                >
                    {onSearchPage ? "My Watchlist" : "Search for movies"}
                </Link>
            </div>
        </header>
    )
}