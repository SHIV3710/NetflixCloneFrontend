import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import CardSlider from "../components/CardSlider";
import { onAuthStateChanged } from "firebase/auth";
import { fire } from "../utils/firebase-config";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import { Genres, fetchbygenre } from "../store/action";


function MoviePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const [email, setEmail] = useState("");
  const {state} = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Genres());
    setEmail(state.email)
  }, []);


  
  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchbygenre(genres));
    }
  }, [genresLoaded]);
  
  const [user, setUser] = useState(undefined);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} email={email}  />
      </div>
      <div className="data">
        {
          genres && genres.genres?<>
          <SelectGenre genres={genres.genres} type="movie" />
          {movies.length ? <Slider movies={movies} email={email} /> : <NotAvailable />}
          </>:<></>
        }
        
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    border-radius: 1rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
      
    }
  }
`;
export default MoviePage;
