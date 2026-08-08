// src/components/Playlist.jsx
import SongItem from "./songItem";

function Playlist({ songs, currentSong, onSelectSong }) {
  return (
    <div className="playlist">
      {songs.length === 0 ? (
        <p className="no-results">Koi song nahi mila</p>
      ) : (
        songs.map((song) => (
          <SongItem
            key={song.id}
            song={song}
            isActive={currentSong?.id === song.id}
            onSelect={onSelectSong}
          />
        ))
      )}
    </div>
  );
}

export default Playlist;