// src/components/SongItem.jsx
function SongItem({ song, isActive, onSelect }) {
  return (
    <div
      className={`song-item ${isActive ? "active" : ""}`}
      onClick={() => onSelect(song)}
    >
      <img src={song.cover} alt={song.title} className="song-cover" />
      <div className="song-info">
        <p className="song-title">{song.title}</p>
        <p className="song-artist">{song.artist}</p>
      </div>
      <span className="song-category">{song.category}</span>
    </div>
  );
}

export default SongItem;