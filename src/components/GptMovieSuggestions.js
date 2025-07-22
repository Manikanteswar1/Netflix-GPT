import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

export const GptMovieSuggestions = ({ onMovieClick }) => {
  const gptResults = useSelector((store) => store.gpt);
  const { movieNames, gptMovies } = gptResults;
  if (!movieNames) return;
  return (
    <div className="mt-6 bg-black text-white bg-opacity-80 rounded-lg">
    <div>
      {movieNames.map((movieName, index) => (
        <MovieList
          key={movieName}
          movies={gptMovies[index]} 
          title={movieName}
          onMovieClick={onMovieClick}
        />
        
      ))}

      

    </div>
    </div>
  );
};
