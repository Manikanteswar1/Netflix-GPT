import { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants"; 

const useMovieProviders = (movieId) => {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const getProviders = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/"+movieId+"/watch/providers",
          API_OPTIONS
        );
        const data = await res.json();
        const providers = data.results?.IN?.flatrate;
        setProviders(providers);
        
      } catch (err) {
        console.error("Error fetching providers:", err);
      }
    };

    if (movieId) getProviders();
  }, [movieId]);

  return providers;
};

export default useMovieProviders;
