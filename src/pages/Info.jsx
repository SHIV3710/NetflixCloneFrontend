import {React, useEffect, useState} from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate,useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Info() {
  const navigate = useNavigate();
  const location = useLocation();
  const movie= location.state.id;
  const {genres} = useSelector((state)=>state.netflix);
  const [x,setx] = useState([]);
  useEffect(() => {
    let mov = [];
    if (genres.genres && genres.genres.length > 0) {
      genres.genres.forEach((item) => {
        if(movie.genre_ids && movie.genre_ids.length > 0){
          movie.genre_ids.forEach((gen)=>{
            if(gen === item.id){
              mov.push(item);
            }
          })
        }
      });
    }
    setx(mov);
  }, []);

  
  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <div className="movie">
       <img  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="movie Img" />
       <div className="name">
       Name :  {movie.original_title}
       </div>
      <div className="others">
      Genres :
      { x && x.length>0?
        x.map((item,index)=>{
         return <span style={{fontSize:"xx-large"}}>{` ${item.name}, `}</span>
        }):<>No genre Found</>
      }
      </div>
      </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 2.5rem;
        cursor: pointer;
      }
    }
    .movie {
      height: 100%;
      width: 100%;
      text-align: center;
      color: white;
      img{
        height: 60%;
        width: 60%;
        margin: 10px auto;
        object-fit: contain;
      }
      .name{
        font-size: 4rem;
        font-weight: bold;
      }
      .others{
        font-size: 3rem;
        font-weight: bold;
        width: 100%;
        text-align: center;
      .gen{
        margin-left: 20px;
      }
      }

    }

  }
`;
