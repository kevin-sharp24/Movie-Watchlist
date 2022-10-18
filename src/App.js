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

    // update watchlistElems state everytime watchlist state value changes
    // these states are held seperately because holding JSX in local storage doesn't make much sense,
    // but we need the JSX for the watchlist elems held in state so the watchlist can update in response to user actions
    useEffect(() => {
        localStorage.setItem("myWatchlist", JSON.stringify(watchlist))
        setWatchlistElems(() => {
            const watchlistObj = JSON.parse(localStorage.getItem("myWatchlist"))
            
            let elems = []
            for (const key in watchlistObj) {
                elems.push(
                    <SearchResult
                        onSearchPage={false}
                        handleClick={removeItemFromWatchlist}
                        key={key}
                        movieDetails={{...watchlistObj[key]}}
                    />
                )
            }
            return elems
        })
    }, [watchlist])

    // page held in state so that header component can respond dynamically
    function setPage(newValue) {
        setOnSearchPage(newValue)
    }

    function addItemToWatchlist(item) {
        setWatchlist(prevWatchlist => {
            return {...prevWatchlist, [item.key]: item}
        })
    }

    function removeItemFromWatchlist(item) {      
        setWatchlist(prevWatchlist => {
            delete prevWatchlist[item.key]
            // simply deleting a key from an object maintains the object's old reference

            // creating a new reference to the value is required here in order to get React to detect a change in state         
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
                                watchlist={watchlist}
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
