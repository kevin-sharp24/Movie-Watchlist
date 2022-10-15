import React, {useEffect} from "react"
import {Link} from "react-router-dom"
import PlusIcon from "../images/plus-icon.png"

export default function WatchlistPage({setPage, watchlistElems}) {

    useEffect(() => {
        setPage()
    }, [setPage])

    const styles = {
        height: "calc(100% - 30vw)"
    }

    const isWatchlistEmpty = watchlistElems.length === 0

    console.log("watchlist page rendered")
    console.log(watchlistElems)

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