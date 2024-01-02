import axios from 'axios';
import { API_KEY, TMDB_BASE_URL } from '../utils/constants';
import { fetchMovies, getGenres } from '.';

export const Genres = () => async(dispatch) => {
    try {
      const { data } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
      dispatch(getGenres(data));
    } catch (error) {
      console.log(error);
    }
};

export const fetchbygenre = (genre) => async (dispatch) => {
  try {
    let movies = [];
    if(genre){
      for(const item of genre.genres){
        const data = await axios.get(`${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${item.id}`);
        const movie = data.data.results;
        movie.map((mov,index)=>{
          movies.push(mov);
        })
      }
      dispatch(fetchMovies(movies));
    }
  } catch (error) { 
    console.log(error);
  }
}

export const fetchbyselectedgenre = (genreid) => async (dispatch) => {
  try {
    let movies = [];
    const data1 = await axios.get(`${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreid}&page=1`);
    const data2 = await axios.get(`${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreid}&page=2`);
    const data3 = await axios.get(`${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreid}&page=3`);
    const data4 = await axios.get(`${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreid}&page=4`);
    movies = [...data1.data.results, ...data2.data.results, ...data3.data.results, ...data4.data.results];
    dispatch(fetchMovies(movies));
  } catch (error) {
    console.log(error); 
  }
}

export const getmoviebyid = (id) => async(dispatch) => {
  try {
    
  } catch (error) {
    console.log(error);
  }
}
