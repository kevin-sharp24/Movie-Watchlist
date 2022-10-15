import React from "react"
import {Link} from "react-router-dom"
import SearchResult from "./SearchResult"
import PlusIcon from "../images/plus-icon.png"

export default function WatchlistPage({handleClick, setPage}) {

    React.useEffect(() => {
        setPage()
    }, [setPage])

    const styles = {
        height: "calc(100% - 30vw)"
    }

    let watchlistElems = []
    function getWatchlistItems() {
    
        const watchlistObj = JSON.parse(localStorage.getItem("myWatchlist"))

        for (const key in watchlistObj) {
            watchlistElems.push(
                <SearchResult
                    handleClick={handleClick}
                    key={key}
                    {...watchlistObj[key]}
                />
            )
        }
    }
    getWatchlistItems()
    const isWatchlistEmpty = watchlistElems.length === 0

    return (
        <main 
            id="watchlist-page"
            className="flex-center content-fit-width"
            style={isWatchlistEmpty ? styles : {}}
        >
            {!isWatchlistEmpty ?
                watchlistElems :
                <div id="empty-watchlist">
                    <p className="empty-page-text flex-center">Your watchlist is looking a little empty...</p>
                    <Link id="watchlist-page--search-page-cta" className="flex-center" to="/">
                        <img src={PlusIcon} alt=""/>
                        <p>Let's add some movies!</p>
                    </Link>
                </div>
            }
        </main>
    )
}