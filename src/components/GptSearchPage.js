import React from "react";
import GptSearchBar from "./GptSearchBar";
import { Bg_URL } from "../utils/constants";
import { GptMovieSuggestions } from "./GptMovieSuggestions";

const GptSearchPage = () => {
  return (
    <>
    <div className="fixed -z-10">
        <img
          className="h-screen object-cover md:h-auto"
          src={Bg_URL}
          alt="background"
        />
      </div>
    <div className="">
      
      <GptSearchBar />
      <GptMovieSuggestions/>
    </div>
    </>
  );
};

export default GptSearchPage;
