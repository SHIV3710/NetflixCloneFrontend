import {React} from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate,useLocation } from "react-router-dom";
export default function Info() {
  const navigate = useNavigate();
  const location = useLocation();
  const movie= location.state.id;
  var x =movie.genres;

  //by using useNavigate and useLocation we fetch the movie 
  // movie jiske more info me hmne click kia
  
  console.log(x)
// https://api.themoviedb.org/3/movie/453395?api_key=6d75b2a2e2b05ca51b4dda2ad6426fda&append_to_response=videos


 
  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
          {/* wapis main page pe */}
        </div>
      <div className="movie">
       <img  src={`https://image.tmdb.org/t/p/original/${movie.image}`} alt="movie Img" />
       {/* movie ki image laga di */}
       <div className="name">
       Name :  {movie.name}
       {/* yha name */}
       </div>
      <div className="others">
      Genres :
       {
        x.map((r) => (
          <span className="gen">{r} ,</span>
        ))
        //learn how we get this
        // jin genre se wo movie match kri unke name
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
