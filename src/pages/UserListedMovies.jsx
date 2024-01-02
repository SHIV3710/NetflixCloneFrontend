import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fire } from "../utils/firebase-config";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import axios from "axios";

export default function UserListedMovies() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mail, setEmail] = useState("");
  const [movies,setmovies] = useState([]);
  const {state} = useLocation();

  useEffect(()=>{
    setEmail(state.email);
    getmovie(state.email);
  },[])
  
  const getmovie = async (email) => {
    try { 
      await axios.put("https://netflix-clone-30uw.onrender.com/api/liked",{ 
          email:email,
      }).then((res)=>{
        console.log(res);
        const mov = res.data.movies;
        setmovies(mov);
      })
      
    } catch (error) {
      console.log(error); 
    }
  }
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <Container>
      <Navbar isScrolled={isScrolled} email={mail} />
      <div className="content">
        <h1>My List</h1>
      </div>
        <div className="mov">
      
        {
          movies.map((movie, index) => {
            return <Card movieData={movie} key={index} />;
          })
          
        } 
        </div>
    </Container>
  );
}

const Container = styled.div`
  display:flex;
  flex-direction: column;
  width:100vw;
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    display: flex ;
    flex-direction: column;
    justify-content: center;
    flex-wrap: nowrap;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
  .mov{
    width:100vw;
    padding:2vw;
    height:fit-content;  
    display: flex;
    gap:2vw;
    flex-wrap: wrap;
  }
`;
