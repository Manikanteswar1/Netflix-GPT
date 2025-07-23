import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className="pt-[25%] md:pt-[20%] p-4 md:px-8 w-screen aspect-video absolute text-white bg-gradient-to-r from-black">
        <h1 className="md:text-6xl text-2xl font-semibold mt-10 md:mt-0 opacity-70">{title}</h1>
        <p className="hidden md:block py-6 text-lg w-1/3 opacity-60 h-28 overflow-hidden">{overview}</p>
        <button className="md:bg-white bg-gray-700 md:text-black text-white px-5 md:px-10 my-1 py-1 md:py-2 text-lg rounded-md opacity-75 bg-opacity-70 hover:bg-opacity-80"> Play</button>
        <button  className="hidden md:inline-block bg-gray-700 text-white mx-2 px-8 p-2 text-lg rounded-md bg-opacity-50 hover:bg-opacity-80">More Info</button>
    </div>
  )
}

export default VideoTitle