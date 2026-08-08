// src/hooks/useAudioPlayer.js
import { useState, useRef, useEffect } from "react";

function useAudioPlayer(currentSong) {
  const audioRef = useRef(null); // audio element ka reference
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // current time (seconds)
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // 0 to 1

  // Jab currentSong badle, naya song load karein aur auto-play karein
  useEffect(() => {
    if (!currentSong) return;
    const audio = audioRef.current;
    audio.src = currentSong.src;
    audio.play();
    setIsPlaying(true);
  }, [currentSong]);

  // Play/Pause toggle
  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Volume badlein
  const changeVolume = (value) => {
    audioRef.current.volume = value;
    setVolume(value);
  };

  // Seek karein (progress bar drag karke)
  const seek = (value) => {
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  // Audio events ko sunna (time update, load, khatam hona)
  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return {
    audioRef,
    isPlaying,
    progress,
    duration,
    volume,
    togglePlay,
    changeVolume,
    seek,
    setIsPlaying,
  };
}

export default useAudioPlayer;