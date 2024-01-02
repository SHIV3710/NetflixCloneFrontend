import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY, TMDB_BASE_URL } from '../utils/constants';

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
  user:"",
};

const netflixSlice = createSlice({
  name: 'Netflix',
  initialState,
  reducers: {
    setuser:(state,action)=>{
      state.user = action.payload;
    },
    getGenres:(state,action)=>{
      state.genres = action.payload;
      state.genresLoaded = true;
    },
    fetchMovies:(state,action)=>{
      state.movies = action.payload;
    },
    fetchDataByGenre:(state,action)=>{
      state.movies = action.payload;
    },
    getUsersLikedMovies:(state,action)=>{
      state.movies = action.payload;
    },
    removeMovieFromLiked:(state,action)=>{
      state.movies = action.payload;
    }
  },
});

export const{
  getGenres,
  setuser,
  fetchMovies,
  fetchDataByGenre,
  getUsersLikedMovies,
  removeMovieFromLiked,
} =  netflixSlice.actions;

export const store = configureStore({
  reducer: {
    netflix: netflixSlice.reducer,
  },
});

export default netflixSlice.reducer;
