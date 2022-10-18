import React, {useEffect} from "react"
import {Link} from "react-router-dom"
import PlusIcon from "../images/plus-icon.png"

export default function WatchlistPage({setPage, watchlistElems}) {

    useEffect(() => {
        setPage()
    }, [setPage])

    const styles = {
        // header height is set by screen width until width=1000px; screen height is set proportionately 
        height: window.matchMedia("(max-width: 1000px)").matches ? "calc(100% - 30vw)" : "calc(100% - 300px)"
    }

    const isWatchlistEmpty = watchlistElems.length === 0

    return (
        <main 
            id="watchlist-page"
            className="flex-center content-fit-width"
            // if the watchlist has items, setting a height value may cause the items to overflow the top of container
            // and crowd the header instead of extending the container downward like we want
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