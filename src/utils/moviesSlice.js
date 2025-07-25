import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies:null,
        popularMovies:null,
        topRatedMovies:null,
        upComingMovies:null,
        trailerVideo:null,
        contentFilter:false,        
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        addUpComingMovies: (state, action) => {
            state.upComingMovies = action.payload;
        },
        addTrailerVideo:(state, action)=>{
            state.trailerVideo=action.payload;
        },
        setContentFilter:(state)=>{
            state.contentFilter=!state.contentFilter;
        }
    },
})
export const { addNowPlayingMovies, addTrailerVideo,addPopularMovies,addTopRatedMovies, addUpComingMovies, setContentFilter} = moviesSlice.actions;

export default moviesSlice.reducer;