import React from "react"
import {Link} from "react-router-dom"

export default function Header() {
    const [onSearchPage, setOnSearchPage] = React.useState(true)

    function handleClick() {
        setOnSearchPage(onSearchPage => !onSearchPage)
    }

    return (
        <header>
            <div className="content-fit-width">
                <h1>Find your film</h1>
                <Link 
                    id="header--nav-link" 
                    to={onSearchPage ? "/watchlist" : "/"}
                    onClick={handleClick}
                >
                    {onSearchPage ? "My Watchlist" : "Search for movies"}
                </Link>
            </div>
        </header>
    )
}