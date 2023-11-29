import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fire } from "../utils/firebase-config";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import axios from "axios";
import Usermoviecard from "../components/Usermoviecard";
// import movie from "../../../Backend/models/movie";

export default function UserListedMovies() {
  // const movies = useSelector((state) => state.netflix.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mail, setEmail] = useState("shiva");
  const [movies,setmovies] = useState([]);
  const currentUser = fire.currentUser;
  const uid = currentUser ? currentUser.uid : null;
  const {state} = useLocation();
  useEffect(()=>{
    setEmail(state.email);
  },[])
  
  const getmovie = async () => {
    try {

      await axios.get("https://netflixbackend-one.vercel.app/api/liked",{
        params:{
          email:mail,
        }
      }).then((res)=>{
        console.log(res);
        const mov = res.data.movies;
        setmovies(mov);
      })
      
    } catch (error) {
      console.log(error); 
    }
  }
  useEffect(() => {
    getmovie();
  }, [mail])

  // window.onscroll = () => {
  //   setIsScrolled(window.pageYOffset === 0 ? false : true);
  //   return () => (window.onscroll = null);
  // };
  console.log(movies);
  return (
    <Container>
      <Navbar isScrolled={isScrolled} email={mail} />
      <div className="content">
        <h1>My List</h1>
      </div>
        <div className="mov">
      
        {
          movies.map((movie, index) => {
            console.log("gello")
            return <Usermoviecard movieData={movie} key={index} />;
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
    /* justify-content: center; */
    /* flex-wrap: wrap; */
    gap:2vw;
    /* justify-contx  x ent: space-around; */
    /* flex-direction: column; */
  }
`;
