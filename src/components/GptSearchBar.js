import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS, GEMINI_KEY } from "../utils/constants";
import { addGptMovies } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langkey = useSelector((store) => store.config.lang);
  const contentFilter = useSelector((store) => store.movies.contentFilter);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  // const handleGptSearchClick = async () => {
  //   const gptQuery = "Act as Movies Recommendation system and suggest some movies for the query :" + searchText.current.value + ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: OG, Coolie, Akhanda 2, Hari Hara Veera Mallu Kuberaa";
  //   const gptResults = await openai.chat.completions.create({
  //     messages: [{ role: "user", content: gptQuery }],
  //     model: "gpt-3.5-turbo",
  //   });
  //   console.log(gptResults.choices);
  // }; OPEN AI'S CODE

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult="+contentFilter+"&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    const apiKey = GEMINI_KEY;
    const endpoint =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
      apiKey;

    const gptQuery =
      "Act as Movies Recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: OG, Coolie, Akhanda 2, Hari Hara Veera Mallu, Kuberaa (Note: dont give any extra text except movie names)";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: gptQuery }],
            },
          ],
        }),
      });

      const data = await res.json();
      const responseMovies =
        data?.candidates?.[0]?.content?.parts?.[0]?.text.split(",").map((movie) => movie.trim()) ||
        "No response";
      const promiseArray = responseMovies.map((movie) =>
        searchMovieTMDB(movie)
      );
      const tmdbResults = await Promise.all(promiseArray);
      dispatch(
        addGptMovies({ movieNames: responseMovies, gptMovies: tmdbResults })
      );
    } catch (err) {
      // console.error("Error calling Gemini API:", err);
    }
  };

  return (
    <div className="pt-[35%] md:pt-[6%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 bg-opacity-50 rounded-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={searchText}
          className="p-4 m-4 col-span-9 rounded-md"
          placeholder={lang[langkey]?.getSearchPlaceholder}
        />
        <button
          className="col-span-3 mr-4 my-4 py-2 px-4 md:m-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langkey]?.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
