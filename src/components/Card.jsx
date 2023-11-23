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

export default React.memo(function Card({ index, movieData, isLiked = false ,email}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [Email, setEmail] = useState("");
  const [like,setlike] = useState(true);


  useEffect(() => {
    setEmail({email});
  }, [])
  

  
  const addToList = async () => {
    try {
      await axios.post("https://netflix-clone-alpha-plum.vercel.app/api/add", {
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
      await axios.put("https://netflix-clone-alpha-plum.vercel.app/api/remove",{
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
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="card"
        onClick={() => navigate("/player")}
      />

      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
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
});

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


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import { IoPlayCircleSharp } from "react-icons/io5";
// import { AiOutlinePlus } from "react-icons/ai";
// import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
// import { BiChevronDown } from "react-icons/bi";
// import { BsCheck } from "react-icons/bs";
// import axios from "axios";
// import { onAuthStateChanged } from "firebase/auth";
// import { fire } from "../utils/firebase-config";
// import { useDispatch } from "react-redux";
// import { removeMovieFromLiked } from "../store";
// import { getDatabase, ref, push, set } from "firebase/database"; // Added Firebase database functions

// export default React.memo(function Card({ index, movieData, isLiked = false }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isHovered, setIsHovered] = useState(false);
//   const [email, setEmail] = useState(undefined);

//   onAuthStateChanged(fire, (currentUser) => {
//     if (currentUser) {
//       setEmail(currentUser.email);
//     } else {
//       navigate("/login");
//     }
//   });

//   const handleLikeMovie = () => {
//     const currentUser = fire.currentUser;
//     const uid = currentUser ? currentUser.uid : null;

//     if (!uid) {
//       // User is not logged in, handle accordingly (e.g., redirect to login)
//       return;
//     }

//     // Add the liked movie to Firebase
//     const database = getDatabase();
//     const userLikedMoviesRef = ref(database, `users/${uid}/likedMovies`);

//     // Create a new reference for the liked movie and push it to the user's liked movies
//     const newMovieRef = push(userLikedMoviesRef);

//     // Set the movie data in the new reference
//     set(newMovieRef, movieData)
//       .then(() => {
//         console.log("Movie liked and added to user's liked movies in Firebase.");
//       })
//       .catch((error) => {
//         console.error("Error adding liked movie to Firebase:", error);
//       });
//   };

//   const handleDislikeMovie = () => {
//     const currentUser = fire.currentUser;
//     const uid = currentUser ? currentUser.uid : null;

//     if (!uid) {
//       // User is not logged in, handle accordingly (e.g., redirect to login)
//       return;
//     }

//     // Add the disliked movie to Firebase
//     const database = getDatabase();
//     const userDislikedMoviesRef = ref(database, `users/${uid}/dislikedMovies`);

//     // Create a new reference for the disliked movie and push it to the user's disliked movies
//     const newMovieRef = push(userDislikedMoviesRef);

//     // Set the movie data in the new reference
//     set(newMovieRef, movieData)
//       .then(() => {
//         console.log("Movie disliked and added to user's disliked movies in Firebase.");
//       })
//       .catch((error) => {
//         console.error("Error adding disliked movie to Firebase:", error);
//       });
//   };

//   const handleAddToMyList = () => {
//     const currentUser = fire.currentUser;
//     const uid = currentUser ? currentUser.uid : null;

//     if (!uid) {
//       // User is not logged in, handle accordingly (e.g., redirect to login)
//       return;
//     }

//     // Add the movie to the user's list in Firebase
//     const database = getDatabase();
//     const userMovieListRef = ref(database, `users/${uid}/movieList`);

//     // Create a new reference for the movie and push it to the user's list
//     const newMovieRef = push(userMovieListRef);

//     // Set the movie data in the new reference
//     set(newMovieRef, movieData)
//       .then(() => {
//         console.log("Movie added.");
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   return (
//     <Container
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <img
//         src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
//         alt="card"
//         onClick={() => navigate("/player")}
//       />

//       {isHovered && (
//         <div className="hover">
//           <div className="image-video-container">
//             <img
//               src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
//               alt="card"
//               onClick={() => navigate("/player", { state: { id: movieData } })}
//             />
//           </div>
//           <div className="info-container flex column">
//             <h3 className="name" onClick={() => navigate("/player", { state: { id: movieData } })}>
//               {movieData.name}
//             </h3>
//             <div className="icons flex j-between">
//               <div className="controls flex">
//                 <IoPlayCircleSharp
//                   title="Play"
//                   onClick={() => navigate("/player", { state: { id: movieData } })}
//                 />
//                 <RiThumbUpFill title="Like" onClick={handleLikeMovie} />
//                 <RiThumbDownFill title="Dislike" onClick={handleDislikeMovie} />
//                 {isLiked ? (
//                   <BsCheck
//                     title="Remove from List"
//                     onClick={() =>
//                       dispatch(
//                         removeMovieFromLiked({ movieId: movieData.id, email })
//                       )
//                     }
//                   />
//                 ) : (
//                   <AiOutlinePlus title="Add to my list" onClick={handleAddToMyList} />
//                 )}
//               </div>
//               <div className="info">
//                 <BiChevronDown onClick={() => navigate("/info", { state: { id: movieData } })} title="More Info" />
//               </div>
//             </div>
//             <div className="genres flex">
//               <ul className="flex">
//                 {movieData.genres.map((genre) => (
//                   <li>{genre}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </Container>
//   );
// });

// const Container = styled.div`
//   max-width: 230px;
//   width: 230px;
//   height: 100%;
//   cursor: pointer;
//   position: relative;
//   transition: all 0.6s ease-in;
//   img {
//     border-radius: 0.2rem;
//     width: 100%;
//     height: 100%;
//     z-index: 10;
//   }
//   .hover {
//     z-index: 99;
//     height: max-content;
//     width: 20rem;
//     position: absolute;
//     top: -18vh;
//     left: 0;
//     border-radius: 0.3rem;
//     box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
//     background-color: #181818;
//     transition: all 0.6s ease-in;
//     .image-video-container {
//       position: relative;
//       height: 140px;
//       img {
//         width: 100%;
//         height: 140px;
//         object-fit: cover;
//         border-radius: 0.3rem;
//         top: 0;
//         z-index: 4;
//         position: absolute;
//       }
//     }
//     .info-container {
//       padding: 1rem;
//       gap: 0.5rem;
//     }
//     .icons {
//       .controls {
//         display: flex;
//         gap: 1rem;
//       }
//       svg {
//         font-size: 2rem;
//         cursor: pointer;
//         transition: 0.3s ease-in-out;
//         &:hover {
//           color: #b8b8b8;
//         }
//       }
//     }
//     .genres {
//       ul {
//         gap: 1rem;
//         li {
//           padding-right: 0.7rem;
//           &:first-of-type {
//             list-style-type: none;
//           }
//         }
//       }
//     }
//   }
// `
