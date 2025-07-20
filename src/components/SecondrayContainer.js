import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'
const SecondrayContainer = () => {
  const movies = useSelector((store)=>store.movies)
  return (
    <div className=" bg-black">
      <div className="mt-0 md:-mt-80 relative z-10">
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Popular"} movies={movies.popularMovies}/>
      <MovieList title={"Top Rated"} movies={movies.topRatedMovies}/>
      <MovieList title={"UpComing"} movies={movies.upComingMovies}/>
      </div>
    </div>
  )
}

export default SecondrayContainer;