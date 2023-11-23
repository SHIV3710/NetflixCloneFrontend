import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fire } from "../utils/firebase-config";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import axios from "axios";
// import movie from "../../../Backend/models/movie";

export default function UserListedMovies() {
  // const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);

  const currentUser = fire.currentUser;
  const uid = currentUser ? currentUser.uid : null;
  const {state} = useLocation();
  let movies = [];
  
  const getmovie = async () => {
    try {

      await axios.get("https://netflix-clone-alpha-plum.vercel.app/api/liked",{
          email:state.email,
      }).then((res)=>{
        const mov = res.data.movies;
        mov.map((movie,index)=>{
          if(movie)
            movies.push(movie);
        });
        // console.log(movies);
        // console.log(res);
      })
      
    } catch (error) {
      console.log(error); 
    }
  }
  useEffect(() => {
    setEmail(state.email);
    getmovie();
  }, [])

  // window.onscroll = () => {
  //   setIsScrolled(window.pageYOffset === 0 ? false : true);
  //   return () => (window.onscroll = null);
  // };
  // console.log(movies);
  return (
    <Container>
      <Navbar isScrolled={isScrolled} email={email} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="mov">
        {
          movies.map((movie, index) => {
            console.log("fff");
            console.log(movie);
            // return <Card movieData={movie} key={index} />;
          })
          
        } 
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
