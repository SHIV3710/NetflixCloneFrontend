import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { AiOutlineInfoCircle ,AiTwotoneLike,AiOutlineLike} from "react-icons/ai";
import {FcLike} from "react-icons/fc";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { fire } from "../utils/firebase-config";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../store";
import { useEffect } from "react";

export default function Usermoviecard({movieData,email}) {
    console.log("hello");
    console.log({movieData});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [Email, setEmail] = useState("");
  const [like,setlike] = useState(true);


  useEffect(() => {
    setEmail({email});
  }, [])
  
  console.log(movieData.image);
  
  const addToList = async () => {
    try {
      await axios.post("https://netflixbackend-one.vercel.app/api/add", {
        email:email,
        data:{
          name:movieData.name,
          image:movieData.image,
          genres:movieData.genres,
        },
      }).then((res)=>{
        console.log(res);
        handlelike();
      })
    } catch (error) {
      console.log(error.res.message);
    }
  };

  const removeFromList = async () => {
    try {
      await axios.put("https://netflixbackend-one.vercel.app/api/remove",{
          email:email,
          name:movieData.name,

      }).then((res)=>{
        console.log(res);
        handlelike();
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  const handlelike = () =>{
      setlike(!like);
  }
  useEffect(() => {
    console.log(like);
  }, [like])
  console.log("aaaa");
  console.log({movieData});
  return (
    <Container
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <img
      src={`https://image.tmdb.org/t/p/w500${movieData.image.url}`}
      alt="card"
      onClick={() => navigate("/player")}
    />

    {isHovered && (
      <div className="hover">
        <div className="image-video-container">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.image.url}`}
            alt="card"
            onClick={() => navigate("/player",{state:{id:movieData}})}
          />
        </div>
        <div className="info-container flex column">
          <h3 className="name" onClick={() => navigate("/player",{state:{id:movieData}})}>
            {movieData.name}
          </h3>
          <div className="icons flex j-between">
            <div className="controls flex">
              <IoPlayCircleSharp
                title="Play"
                onClick={() => navigate("/player",{state:{id:movieData}})}
              />
              {like ? <AiOutlineLike title="Like" onClick={addToList}/>: <AiTwotoneLike title="Like" onClick={handlelike}/>}
              
              <RiThumbDownFill title="Dislike" onClick={removeFromList}/>
              {!like ? (
                <BsCheck
                  title="Remove from List"
                />
              ) : (
                <AiOutlinePlus title="Add to my list" onClick={addToList} />
              )}
            </div>
            <div className="info">
              <AiOutlineInfoCircle onClick={()  => navigate("/info",{state:{id:movieData}})} title="More Info" />
            </div>
          </div>
          <div className="genres flex">
            <ul className="flex">
              {movieData.genres.map((genre) => (
                <li>{genre}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )}
  </Container>
  );
};

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  transition: width 5s, height 5s;
  
  
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    /* transition: all 0.9s ease-out; */
    

    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;
