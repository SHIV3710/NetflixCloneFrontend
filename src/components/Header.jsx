import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <StyledHeader className="flex a-center j-between">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/")}>
        {props.login ? "Log In" : "Sign Up"}
      </button>
    </StyledHeader>
  );
}
const StyledHeader = styled.header`
  width:100vw;
  display: flex;
  justify-content: space-between;
  
  .logo {
    padding: 0 2rem;
    img {
      min-height:80px;
      height: 6vw;
    }
  }
  button {
    margin: 0 2rem;
    background-color: #e50914;
    border: none;
    min-height:40px;
    min-width: 90px;
    height:5vh;
    width:5vw;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }



  @media screen and (max-width:500px){
    justify-content: space-around;
    .logo{
      padding:0;
    }
    button{
      padding:0;
    }
  }
`;
