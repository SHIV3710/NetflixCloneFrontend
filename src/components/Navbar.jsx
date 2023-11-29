import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { fire } from "../utils/firebase-config";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import axios from "axios";


export default function Navbar(props) {
  //props me 2 chize he ek to he (isScrolled) and (Email);
  const [showSearch, setShowSearch] = useState(false);
  //search ka state
  const [inputHover, setInputHover] = useState(false);
  //??????
  const links = [
    { name: "Home", link: "/netflix" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  const navigate = useNavigate();
  
  const handlesignout = async () => {
    try {
      await axios.get("https://netflixbackend-one.vercel.app/api/logout").then(response=>{
        navigate("/login");
      })
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <nav className={`${props.isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" />
          </div>
          <ul className="links flex">
            <li><Link to="/netflix" state={{email:props.email}}>Home</Link></li>
            <li><Link to="/movies" state={{email:props.email}}>Movies</Link></li>
            <li><Link to="/mylist" state={{email:props.email}}>My List</Link></li>
          
          </ul>
        </div>
        <div className="right flex a-center">
        <span>{props.email}</span>

          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
              {/* search is missign means i cant search for some specific movies */}
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>

          <button onClick={() => handlesignout(fire)}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 4rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      span{
        position: relative;
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
`;
