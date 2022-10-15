import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

import Header from "./components/Header"
import SearchPage from "./components/SearchPage"
import WatchlistPage from "./components/WatchlistPage"


export default function App() {
    const [onSearchPage, setOnSearchPage] = React.useState(true)
    const [watchlist, setWatchlist] = React.useState(
        localStorage.getItem("myWatchlist") ? 
        JSON.parse(localStorage.getItem("myWatchlist")) :
        {}
    )
    localStorage.setItem("myWatchlist", JSON.stringify(watchlist))
    //localStorage.removeItem("myWatchlist")

    function addItemToWatchlist(item) {
        setWatchlist(prevWatchlist => {
            return {...prevWatchlist, [item.id]: item}
        })
    }

    function removeItemFromWatchlist(item) {
        setWatchlist(prevWatchlist => {
            delete prevWatchlist[item.id]
            return prevWatchlist
        })
    }

    function setPage(newValue) {
        setOnSearchPage(newValue)
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
                                handleClick={removeItemFromWatchlist}
                            />
                        } 
                    />
                </Routes>
            </div>
        </Router>
    )
}
