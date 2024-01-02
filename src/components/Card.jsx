import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbDownFill } from "react-icons/ri";
import { AiOutlineInfoCircle ,AiTwotoneLike,AiOutlineLike} from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default React.memo(function Card({ index, movieData, isLiked = false ,email}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [Email, setEmail] = useState("");
  const [like,setlike] = useState(true);

  useEffect(() => {
    setEmail(email);
  }, [email])
  const addToList = async () => {
    try {
      await axios.post("https://netflix-clone-30uw.onrender.com/api/add", {
          email:Email,  
          data:{
            original_title:movieData.original_title,
            poster_path:movieData.poster_path,
            genre_ids:movieData.genre_ids,
          },
        // }
      }).then((res)=>{
        handlelike();
      })
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromList = async () => {
    try {
      await axios.put("https://netflix-clone-30uw.onrender.com/api/delete",{
        email:Email, 
        original_title:movieData.original_title,
      }).then((res)=>{
        handlelike();
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handlelike = () =>{
      setlike(!like);
  }
  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
        alt="card"
        onClick={() => navigate("/player")}
      />

      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
              alt="card"
              onClick={() => navigate("/player",{state:{id:movieData}})}
            />
          </div>
          <div className="info-container flex column">
            <h3 className="name" style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}onClick={() => navigate("/player",{state:{id:movieData}})}>
              {movieData.original_title}
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
                {/* {movieData.genres.map((genre) => (
                  <li>{genre}</li>
                ))} */}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
});

const Container = styled.div`
  max-width: 300px;
  width: 290px;
  height: 220px;
  
  cursor: pointer;
  position: relative;
  transition: width 5s, height 5s;  
  
  
  img {
    border-radius: 0.2rem;
    object-fit: fill;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    max-width: 300px;
    width:290px;
    height:350px;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    /* transition: all 0.9s ease-out; */
    

    .image-video-container {
      /* position: relative; */
      height: 70%;
      width:100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        /* position: absolute; */
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
