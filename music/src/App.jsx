import { useState } from "react";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import PlayerControls from "./components/PlayerControls";
import useAudioPlayer from "./hooks/useAudioPlayer";
import useSearchSongs from "./hooks/useSearchSongs";
import "./App.css";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState("top hits");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const player = useAudioPlayer(currentSong);
  const { results, loading } = useSearchSongs(searchTerm);

  const categories = [...new Set(results.map((song) => song.category))];

  const filteredSongs =
    selectedCategory === "All"
      ? results
      : results.filter((song) => song.category === selectedCategory);

  const handleNext = () => {
    const currentIndex = filteredSongs.findIndex(
      (song) => song.id === currentSong?.id
    );
    const nextIndex = (currentIndex + 1) % filteredSongs.length;
    setCurrentSong(filteredSongs[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = filteredSongs.findIndex(
      (song) => song.id === currentSong?.id
    );
    const prevIndex =
      (currentIndex - 1 + filteredSongs.length) % filteredSongs.length;
    setCurrentSong(filteredSongs[prevIndex]);
  };

  return (
    <div className="app">
      <h1>Melodify</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

     {loading && <p className="hint-text">Loading songs...</p>}
      {!loading && results.length === 0 && searchTerm.trim() !== "" && (
        <p className="hint-text">No songs found — try another search 🎵</p>
)}

      {results.length > 0 && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      <Playlist
        songs={filteredSongs}
        currentSong={currentSong}
        onSelectSong={setCurrentSong}
      />

      <PlayerControls
        currentSong={currentSong}
        isPlaying={player.isPlaying}
        togglePlay={player.togglePlay}
        onNext={handleNext}
        onPrev={handlePrev}
        progress={player.progress}
        duration={player.duration}
        onSeek={player.seek}
        volume={player.volume}
        onVolumeChange={player.changeVolume}
      />

      <audio ref={player.audioRef} />
    </div>
  );
}

export default App;