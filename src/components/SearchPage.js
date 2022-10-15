import React, {useState, useEffect} from "react"
import SearchBar from "./SearchBar"
import SearchResult from "./SearchResult"
import FilmReelIcon from "../images/film-reel-icon.png"

export default function SearchPage({handleWatchlistBtnClick, setPage}) {
    const baseURL = "https://www.omdbapi.com/?apikey=ff7ef8c4&"
    const [search, setSearch] = useState("")
    const [searchClicked, setSearchClicked] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const searchResultsElems = searchResults.map(movie => (
        <SearchResult
            handleClick={handleWatchlistBtnClick}
            id={movie.key}
            {...movie}
            onSearchPage={true}
        />
    ))

    const isSearchPageEmpty = !searchResultsElems.length
    const stylesEmpty = {
        height: "calc(100% - 30vw - 1.1875rem)",
        bottom: "45%",
        transform: "translateY(40%)"
    }
    const stylesNotEmpty = {
        paddingTop: "1.1875rem"
    }

    useEffect(() => {
        setPage()
    }, [setPage])
    
    async function handleSearchBtnClick(e) {
        e.preventDefault()
        
        const res = await fetch(`${baseURL}s=${search}`)
        const searchResultsJson = await res.json()
        
        if (searchResultsJson.Search) {
            const movieIDs = searchResultsJson.Search.map(result => result.imdbID)
            
            const promises = []
            for (const id in movieIDs) {
                promises.push(new Promise(async resolve => {
                    const res = await fetch(`${baseURL}i=${movieIDs[id]}`)
                    const movie = await res.json()
                    resolve({key: movieIDs[id], ...movie})
                }))
            }

            Promise.all(promises).then(movies => setSearchResults(movies))
            setSearchClicked(true)
        } else {
            setSearchResults([])
            setSearchClicked(true)
        }      
    }
        
    function handleChange(e) {
        const {value} = e.target
        setSearch(value)
    }
    
    return (
        <div id="search-page-wrapper">
            <SearchBar 
                handleClick={handleSearchBtnClick}
                handleChange={e => handleChange(e)} 
            />
            <main
                id="search-page"
                className="flex-center content-fit-width"
                style={isSearchPageEmpty ? stylesEmpty : stylesNotEmpty}
            >
                {!isSearchPageEmpty ? 
                    searchResultsElems
                    : searchClicked ?
                    <p className="empty-page-text flex-center">Unable to find what you're looking for. Please try another search.</p>
                    : <div id="search-page--start-exploring" className="flex-center">
                        <img src={FilmReelIcon} alt=""/>
                        <p className="empty-page-text">Start exploring</p>
                    </div>
                }
            </main>
        </div>
    )
}