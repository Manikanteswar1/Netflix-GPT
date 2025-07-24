import React, { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";
import useMovieProviders from "../hooks/useMovieProvider";

const MovieTrailerPlayer = ({ movieid }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const providers = useMovieProviders(movieid);
  const [trailerNotFound, setTrailerNotFound] = useState(false);

  const getTrailer = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/" + movieid + "/videos",
        API_OPTIONS
      );
      const data = await res.json();
      const trailers = data.results?.filter(
        (video) => video.type === "Trailer"
      );
      const trailer = trailers?.[0] || data.results?.[0]; //if no trailer we push 1st video from data
      if (trailer?.key) {
        setTrailerKey(trailer.key);
      } else {
        setTrailerNotFound(true);
      }
    } catch (err) {
      console.error("Failed to load trailer:", err);
      setTrailerNotFound(true);
    }
  };
  useEffect(() => {
    setTrailerKey(null);
    setTrailerNotFound(false);
    // Prevent API call if movieid is not provided
    if (!movieid) return;

    getTrailer();
  }, [movieid]);

  return (
    // trailer section
    <div className="w-full aspect-video mb-4 ">
      {trailerKey ? (
        <iframe
          className="w-full h-full"
          src={
            "https://www.youtube.com/embed/" +
            trailerKey +
            "?autoplay=1&mute=0&rel=0"
          }
          title="Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      ) : trailerNotFound ? (
        <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-60 text-white text-lg rounded-lg">
          Trailer not Updated
        </div>
      ) : null}
      {/* OTT Providers Section  */}
      {providers?.length > 0 && (
        <div className="mt-4 bg-black bg-opacity-60 p-3 rounded-lg">
          <p className="text-white text-sm mb-2">Full Movie Available on :</p>
          <div className="flex gap-3">
            {providers.map((provider) => (
              <img
                key={provider.provider_id}
                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                alt={provider.provider_name}
                title={provider.provider_name}
                className="h-8 w-auto"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieTrailerPlayer;
