import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import Footer from '../Footer/Footer'
import Developers from "../components/Developers";
import { FaEyeSlash } from "react-icons/fa6"; 
import { FaEye } from "react-icons/fa6";
import { fire } from "../utils/firebase-config";
import axios from "axios";
function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handlenav = () => {
    navigate("/netflix",{state:{email:formValues.email  }});
  }
  const handleSignIn = async () => {
    try {
      const {email,password} = formValues;
      await axios.post("https://netflix-clone-30uw.onrender.com/api/register",{
          // bo:{
          email:email,
          password:password, 
        // }   
      })
      .then(response=>{
        console.log("regiseted successfully");
        handlenav();
      });

    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <Container showPassword={showPassword}>
      <div>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>The biggest Indian hits. The best Indian stories. All streaming here.</h1>
            <h5>Watch anywhere. Cancel anytime.</h5>
            <h6>
              Ready to watch? Enter your email to create or restart membership.
            </h6>
          </div>
          <div className="form">
            <div className="email">
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
              name="email"
              value={formValues.email}
            />
            </div>
            {showPassword && (
                <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                name="password"
                value={formValues.password}
              />
            )}
            {!showPassword && (
              <button onClick={() => {setShowPassword(true) && setShowPass(true)}}>Get Started</button>
            )}
          </div>
          {showPassword && <button onClick={handleSignIn}>Sign Up</button>}
        </div>
      </div>
      </div>
      {/* <Developers/> */}
      <Footer/>
      
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          font-size:5vw;
          padding: 0 5rem;
        }
        h5{
          font-size:3vw;
        }
        h6{
          font-size:1.5vw;
        }

      }
      .form {
        display: grid;
        grid-template-columns: ${({ showPassword }) =>
          showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        @media screen and (max-width:1200px){
          grid-template-columns: 1fr;
          grid-template-rows: 1fr 1fr;
          row-gap: 10px;
        }
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          border-radius:0.2rem;
          border: 1px solid black;
          font-style: italic;
          width:100%;  
          font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.4rem;
          border-radius: 0.2rem;
          font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
          font-style: italic; 
        }
      }
      button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
      }
    }
  }
`;

export default Signup;
