// src/components/PlayerControls.jsx
import formatTime from "../utils/formatTime";

function PlayerControls({
  currentSong,
  isPlaying,
  togglePlay,
  onNext,
  onPrev,
  progress,
  duration,
  onSeek,
  volume,
  onVolumeChange,
}) {
  if (!currentSong) {
    return <div className="player-controls empty">Select a song to play</div>;
  }

  return (
    <div className="player-controls">
      <div className="now-playing">
        <img src={currentSong.cover} alt={currentSong.title} />
        <div>
          <p className="now-title">{currentSong.title}</p>
          <p className="now-artist">{currentSong.artist}</p>
        </div>
      </div>

      <div className="controls-main">
        <button onClick={onPrev}>⏮ Prev</button>
        <button onClick={togglePlay}>{isPlaying ? "⏸ Pause" : "▶ Play"}</button>
        <button onClick={onNext}>Next ⏭</button>
      </div>

      <div className="seek-bar">
        <span>{formatTime(progress)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={progress}
          onChange={(e) => onSeek(Number(e.target.value))}
        />
        <span>{formatTime(duration)}</span>
      </div>

      <div className="volume-control">
        <span>🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export default PlayerControls;