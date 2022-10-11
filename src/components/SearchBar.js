import React from 'react'

export default function SearchBar({handleClick, handleChange}) {    
    return (
        <form id="search-bar" className="content-fit-width">
            <input 
                className="border font-style" 
                type="search" 
                placeholder="Search for a movie"
                onChange={handleChange}
            />
            <button 
                className="border font-style" 
                onClick={handleClick}>Search
            </button>
        </form>
    )
}