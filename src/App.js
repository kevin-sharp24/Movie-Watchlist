import React, {useState, useEffect} from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

import Header from "./components/Header"
import SearchPage from "./components/SearchPage"
import WatchlistPage from "./components/WatchlistPage"
import SearchResult from "./components/SearchResult"


export default function App() {
    const [onSearchPage, setOnSearchPage] = useState(true)
    const [watchlist, setWatchlist] = useState(
        localStorage.getItem("myWatchlist") ? 
        JSON.parse(localStorage.getItem("myWatchlist")) :
        {}
    )
    const [watchlistElems, setWatchlistElems] = useState([])

    useEffect(() => {
        localStorage.setItem("myWatchlist", JSON.stringify(watchlist))
        setWatchlistElems(() => {
            const watchlistObj = JSON.parse(localStorage.getItem("myWatchlist"))
            
            let elems = []
            for (const key in watchlistObj) {
                elems.push(
                    <SearchResult
                        handleClick={removeItemFromWatchlist}
                        key={key}
                        {...watchlistObj[key]}
                    />
                )
            }
            return elems
        })
    }, [watchlist])

    console.log("app rendered")

    function setPage(newValue) {
        setOnSearchPage(newValue)
    }

    function addItemToWatchlist(e, item) {
        setWatchlist(prevWatchlist => {
            return {...prevWatchlist, [item.id]: item}
        })
    }

    function removeItemFromWatchlist(e, item) {      
        setWatchlist(prevWatchlist => {
            delete prevWatchlist[item.id]            
            const newWatchlist = {...prevWatchlist}
            localStorage.setItem("myWatchlist", JSON.stringify(newWatchlist))
            return newWatchlist
        })
    }

    return (
        <Router>
            <div id="app">
                <Header onSearchPage={onSearchPage}/>
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <SearchPage
                                setPage={() => setPage(true)}
                                handleWatchlistBtnClick={addItemToWatchlist}
                            />
                        }
                    />
                    <Route 
                        path="/watchlist" 
                        element={
                            <WatchlistPage
                                setPage={() => setPage(false)}
                                watchlistElems={watchlistElems}
                            />
                        } 
                    />
                </Routes>
            </div>
        </Router>
    )
}
