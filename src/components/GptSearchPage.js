import React, { useState } from "react";
import GptSearchBar from "./GptSearchBar";
import { Bg_URL } from "../utils/constants";
import { GptMovieSuggestions } from "./GptMovieSuggestions";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { setContentFilter } from "../utils/moviesSlice";
import MovieTrailerPlayer from "./MovieTrailerPlayer";

const GptSearchPage = () => {
  const dispatch = useDispatch();
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const contentFilter = useSelector((store) => store.movies.contentFilter);
  const setContentFliter = () => {
    dispatch(setContentFilter());
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10">
        <img
          className="h-screen  object-cover md:h-auto"
          src={Bg_URL}
          alt="background"
        />
      </div>
      <div className="flex-grow">
        <GptSearchBar />
        <GptMovieSuggestions onMovieClick={setSelectedMovieId} />
        {selectedMovieId && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            
          >
            <div
              className="relative w-full max-w-3xl aspect-video"
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
      <button onClick={setContentFliter}>{contentFilter ? "off" : "on"}</button>
      <Footer />
    </div>
  );
};

export default GptSearchPage;
