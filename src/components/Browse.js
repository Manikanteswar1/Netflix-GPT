import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondrayContainer from "./SecondrayContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearchPage from "./GptSearchPage";
import { useSelector } from "react-redux";
import Footer from "./Footer";
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
        <div className="flex-grow relative">
          <GptSearchPage />
        </div>
        </>
      ) : (
        <div className="bg-black">
          <MainContainer />
          <SecondrayContainer />
          <Footer/>
        </div>
      )}
    </div>
  );
};

export default Browse;
