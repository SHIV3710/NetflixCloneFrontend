import React from "react";
import styled from "styled-components";
import CardSlider from "./CardSlider";
export default function Slider({ movies , email }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };
  return (
    <Container>
      <CardSlider data={getMoviesFromRange(0, 10)} email = {email} title="Trending Now" />
      
      <CardSlider data={getMoviesFromRange(10, 20)} email = {email} title="New Releases" />
      
      <CardSlider data={getMoviesFromRange(20, 30)} email = {email}  title="Blockbuster Movies"/>
      
      <CardSlider data={getMoviesFromRange(30, 40)} email = {email}  title="Popular on Netflix"/>
      
      <CardSlider data={getMoviesFromRange(40, 50)} email = {email} title="Action Movies" />
     
      <CardSlider data={getMoviesFromRange(50, 60)} email = {email} title="Epics" />
      
    </Container>
  );
}

const Container = styled.div``;
