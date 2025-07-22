import React, { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const MovieTrailerPlayer = ({ movieid }) => {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    // Clear previous trailer key
    setTrailerKey(null);

    // Prevent API call if movieid is not provided
    if (!movieid) return;

    const getTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieid}/videos`,
          API_OPTIONS
        );
        const data = await res.json();
        const trailers = data.results?.filter((v) => v.type === "Trailer");
        const trailer = trailers?.[0] || data.results?.[0];
        setTrailerKey(trailer?.key);
      } catch (err) {
        console.error("Failed to load trailer:", err);
      }
    };

    getTrailer();
  }, [movieid]);

  if (!trailerKey) return null;

  return (
    <div className="w-full aspect-video mb-4 ">
      <iframe
        className="w-full h-full"
        src={"https://www.youtube.com/embed/"+trailerKey+"?autoplay=1&mute=1&rel=0"}
        title="Trailer"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MovieTrailerPlayer;
