import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondrayContainer from "./SecondrayContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearchPage";
import { useSelector } from "react-redux";
import { GptMovieSuggestions } from "./GptMovieSuggestions";
const Browse = () => {
  const showGptSearch = useSelector(store=>store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div>
      <Header />
      {showGptSearch ? (
        <>
        <GptSearch />
        
        </>
      ) : (
        <>
          <MainContainer />
          <SecondrayContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
