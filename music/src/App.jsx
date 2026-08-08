// src/App.jsx
import { useState } from "react";
import songs from "./data/song";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import "./App.css";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sab unique categories nikalna songs list se
  const categories = [...new Set(songs.map((song) => song.category))];

  // Filtering logic
  const filteredSongs = songs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || song.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <h1>My Music Player</h1>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <Playlist
        songs={filteredSongs}
        currentSong={currentSong}
        onSelectSong={setCurrentSong}
      />
    </div>
  );
}

export default App;