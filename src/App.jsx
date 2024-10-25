import React, { useState } from 'react';
import MovieSearch from './components/MovieSearch';
import MovieDetails from './components/MovieDetails';
import styled from 'styled-components';
import logo from './img/logo.jpg';

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const MovieContainer = styled.div`
  width: 40%;
  height: 100%;
  overflow-y: auto;
`;

const DetailsContainer = styled.div`
  width: 60%;
  position: relative;
`;

const Logo = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 150px;
  height: auto;
  z-index: 2;
`;

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie)
  };

  return (
    <AppContainer>
      <MovieContainer>
        <MovieSearch onMovieSelect={handleMovieSelect} />
      </MovieContainer>
      <DetailsContainer>
        <Logo src={logo} alt="Logo" />
        <MovieDetails movie={selectedMovie} />
      </DetailsContainer>
    </AppContainer>
  );
};

export default App;
