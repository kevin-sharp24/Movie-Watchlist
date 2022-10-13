import React from "react"
import SearchBar from "./SearchBar"
import SearchResult from "./SearchResult"

export default function SearchPage() {
    const baseURL = "https://www.omdbapi.com/?apikey=ff7ef8c4&"
    const [search, setSearch] = React.useState("")
    const [searchClicked, setSearchClicked] = React.useState(false)
    const [searchResults, setSearchResults] = React.useState([])
    const searchResultsElems = searchResults.length > 0 ? searchResults.map(movie => (
            <SearchResult
                key={movie.key}
                {...movie}
            />
    )) : []
    
    async function handleSearchBtnClick(e) {
        event.preventDefault()
        
        const res = await fetch(`${baseURL}s=${search}`)
        const searchResultsJson = await res.json()
        
        if (searchResultsJson.Search) {
            const movieIDs = searchResultsJson.Search.map(result => result.imdbID)
            console.log(movieIDs)
            
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
                handleClick={e => handleSearchBtnClick(e)}
                handleChange={e => handleChange(e)} 
            />
            <main id="search-page" className="flex-center content-fit-width">
                {searchResultsElems.length ? 
                    searchResultsElems
                    : searchClicked ?
                    <p className="empty-page-text flex-center">Unable to find what you're looking for. Please try another search.</p>
                    : <div id="search-page--start-exploring" className="flex-center">
                        <img src="images/film-reel-icon.png" />
                        <p className="empty-page-text">Start exploring</p>
                    </div>
                }
            </main>
        </div>
    )
}