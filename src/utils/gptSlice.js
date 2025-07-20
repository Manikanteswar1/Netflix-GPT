import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState:{
        showGptSearch : false,
        movieNames:null,
        gptMovies:null,
    },
    reducers:{
        toggleGptSerchView:(state)=>{
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovies:(state, action)=>{
            const {movieNames, gptMovies} = action.payload;
            state.movieNames=movieNames;
            state.gptMovies=gptMovies;
        }
    }
})

export const {toggleGptSerchView, addGptMovies} = gptSlice.actions;

export default gptSlice.reducer;