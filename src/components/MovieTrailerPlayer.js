import React, { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";
import useMovieProviders from "../hooks/useMovieProvider";

const MovieTrailerPlayer = ({ movieid }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerNotFound, setTrailerNotFound] = useState(false);
  const providers = useMovieProviders(movieid);

  const fetchTrailers = async (lang = "") => {
    const url = "https://api.themoviedb.org/3/movie/"+movieid+"/videos"+(lang ? "?language="+lang :  "");
    const res = await fetch(url, API_OPTIONS);
    const data = await res.json();
    return data?.results || [];
  };

  const getTrailer = async () => {
    try {
      let videos = await fetchTrailers("te"); //1st api call for telugu trailer

      if (videos.length === 0) {
        videos = await fetchTrailers(); // 2nd api call if telugu trailer not found
      }

      if (!videos || videos.length === 0) {
        setTrailerNotFound(true);
        return;                        // return if no data found
      }

      const teluguTrailer = videos.find(
        (video) => video.type === "Trailer" && video.iso_639_1 === "te"
      );

      const generalTrailer = videos.find((video) => video.type === "Trailer");

      const fallback = videos[0];

      const finalTrailer = teluguTrailer || generalTrailer || fallback;

      if (finalTrailer?.key) {
        setTrailerKey(finalTrailer.key);
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
    if (!movieid) return;

    getTrailer();
  }, [movieid]);

  return (
    <div className="w-full aspect-video mb-4">
      {trailerKey ? (
        <iframe
          className="w-full h-full rounded-md"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&rel=0`}
          title="Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      ) : trailerNotFound ? (
        <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-60 text-white text-lg rounded-lg">
          Trailer not Updated
        </div>
      ) : null}

      {/* OTT Providers Section */}
      {providers?.length > 0 && (
        <div className="bg-black bg-opacity-80 p-3 rounded-lg opacity-70">
          <p className="text-white text-sm mb-2">Full Movie Available on:</p>
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
