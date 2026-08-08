// src/hooks/useSearchSongs.js
import { useState, useEffect } from "react";

function useSearchSongs(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    // Debounce: user ke type karte hi API call na karein, 
    // 500ms rukein taake typing khatam hone ke baad hi search ho
    const timer = setTimeout(() => {
      fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          query
        )}&media=music&limit=25`
      )
        .then((res) => res.json())
        .then((data) => {
          const normalized = data.results.map((item) => ({
            id: item.trackId,
            title: item.trackName,
            artist: item.artistName,
            category: item.primaryGenreName || "Music",
            cover: item.artworkUrl100.replace("100x100", "400x400"), // badi image
            duration: Math.round(item.trackTimeMillis / 1000),
            src: item.previewUrl, // 30-sec preview
          }));
          setResults(normalized);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Search error:", err);
          setLoading(false);
        });
    }, 500);

    // Cleanup: agar user dobara type kare pehle timer se, purana cancel ho jaye
    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading };
}

export default useSearchSongs;