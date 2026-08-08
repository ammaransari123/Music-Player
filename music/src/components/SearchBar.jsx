function SearchBar({ searchTerm, onSearchChange }) {
    return(
       <input
            type="text"
            className="search-bar"
            placeholder="Search Song/Artist..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
       />
    );
}

export default SearchBar;