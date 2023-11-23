import React, { useState ,useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import Footer from '../Footer/Footer'
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { fire } from "../utils/firebase-config";
import { Link } from "react-router-dom";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [log,setlog] = useState("false");
  const navigate = useNavigate();

  const handleloader = () => {
    setTimeout(() => {
      setlog(true);
    }, 1);
  }

  if(log==true)
      navigate("/netflix", { state: {email: email} });
  
  const handleLogin = async () => {
    try {
      if(email && password){
      await axios.put("https://netflix-clone-alpha-plum.vercel.app/api/login", {
        email:email,
        password:password, 
      })
      .then(response=>{
        handleloader();
      }) 
    }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    {log ? <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form">
            <div className="title">
            Sign In
            </div>
            <div className="container flex column">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                />      
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                />
              <button onClick={handleLogin}> Sign In</button>
            </div>
            <div className="signup">
            New to Netflix? <Link className="link" to='/'>Sign up now.</Link>
            <br />
            <span className="hero">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.
            </span>
            </div>
          </div>
        </div>
        </div>
    </Container>:<></>}
    <Footer/> 
    </>
  );
}

const Container = styled.div`
  position: relative;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  .signup{
    margin: 80px auto;
    color: #ffffff75;
    .link{
      color: white;
      text-decoration: none;
    }
  }

.hero{
  width: 100%;
  margin: 20px auto;
  color: #ffffff75;
}
.form{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  border-radius: 1rem;

}
.title{
  width: 90%;
  text-align: left;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 20px;
  border-radius: 10rem;
}
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      width: 80%;
      height: 85vh;
      margin: 0 auto;
      .form {
        padding: 0 2rem;
        background-color: #000000b0;
        width: 35%;
        height: 100%;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
  
          input {
            padding:  1rem;
            width: 20vw;
            border-radius: 0.4rem;
            border:none;
            font-size:1rem;
            font-style: italic;
          }
          input:focus{
            outline: none ;
          }
          button {
            padding:  1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;

            :active{
              color:black;  
              background-color: #58585d;
              
            }
          }
        }
      }
    }
  }
`;

export default Login;
