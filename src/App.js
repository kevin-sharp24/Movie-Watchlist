import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

import Header from "./components/Header"
import SearchPage from "./components/SearchPage"
import WatchlistPage from "./components/WatchlistPage"


export default function App() {
        
    return (
        <Router>
            <div id="app">
                <Header />
                <Routes>
                    <Route path="/index" element={<SearchPage />} />
                    <Route path="/watchlist" element={<WatchlistPage />} />
                </Routes>
            </div>
        </Router>
    )
}
