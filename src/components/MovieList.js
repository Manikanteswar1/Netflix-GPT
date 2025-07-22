import React, { useState } from "react";
import MovieCard from "./MovieCard";
import MovieTrailerPlayer from "./MovieTrailerPlayer";

const MovieList = ({ title, movies }) => {
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  if (!movies) return null;

  return (
    <div className="md:px-6 px-2">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>

      <div className="flex overflow-x-auto">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              movieid={movie.id}
              onClick={() => setSelectedMovieId(movie.id)}
            />
          ))}
        </div>
      </div>

      {selectedMovieId && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-3xl aspect-video translate-y-[-200px] md:translate-y-0"
          onClick={(e) => e.stopPropagation()}
          >
            <MovieTrailerPlayer movieid={selectedMovieId} />
            <button
              onClick={() => setSelectedMovieId(null)}
              className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
