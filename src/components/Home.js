import React, {useEffect, useState} from "react";
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Movies from "./Movies";
import Viewers from "./Viewers";
import db from "../firebase";

function Home() {
const [movies, setMovies] = useState(null);

  useEffect(() => {
    db.collection("movies").onSnapshot((snapshot) => {
      
      let tempMovies = snapshot.docs.map((doc) => {
        return {id: doc.id, ...doc.data() }
      });
      setMovies(tempMovies);
    })
    
  }, []);


  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Movies movies={movies} />
    </Container>
  );
}

export default Home;

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  overflow-x: hidden;
  position: relative;
  &:before {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;
