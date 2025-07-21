import React from "react";
import GptSearchBar from "./GptSearchBar";
import { Bg_URL } from "../utils/constants";
import { GptMovieSuggestions } from "./GptMovieSuggestions";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { setContentFilter } from "../utils/moviesSlice";

const GptSearchPage = () => {
  const dispatch = useDispatch();
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
        <GptMovieSuggestions />
      </div>
      <button onClick={setContentFliter}>{contentFilter?"off":"on"}</button>
      <Footer />
    </div>
  );
};

export default GptSearchPage;
