function SearchBar({ searchTerm, onSearchChange }) {
    return(
       <input
            type="text"
            className="search-bar"
            placeholder="Song ya artist search karein..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
       />
    );
}

export default SearchBar;