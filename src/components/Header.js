import React from "react"
import {Link} from "react-router-dom"

export default function Header({onSearchPage}) {
    
    return (
        <header>
            <div className="content-fit-width">
                <h1>Find your film</h1>
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