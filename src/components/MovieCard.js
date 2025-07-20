import React from 'react'
import { IMG_CDN_URL } from '../utils/constants';

const MovieCard = ({posterPath}) => {
  if(!posterPath) return;
  return (
    <div className="w-32 md:w-48 pr-4">
      <img className="rounded-md" alt="Movie card" src={IMG_CDN_URL + posterPath}/>
    </div>
  )
}

export default MovieCard;