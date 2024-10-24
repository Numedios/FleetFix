import React, { useState } from 'react';
import MovieSearch from './components/MovieSearch';
import MovieDetails from './components/MovieDetails';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const MovieContainer = styled.div`
  width: 40%; // MovieSearch prend 40%
  height: 100%; // Prendre toute la hauteur
  overflow-y: auto; // Permettre le défilement
`;

const DetailsContainer = styled.div`
  width: 55%; // MovieDetails prend 55%

`;

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(null); // État pour le film sélectionné

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie); // Met à jour l'état avec le film sélectionné
  };

  return (
    <AppContainer>
      <MovieContainer>
        <MovieSearch onMovieSelect={handleMovieSelect} /> {/* Passer la fonction de sélection */}
      </MovieContainer>
      <DetailsContainer>
        <MovieDetails movie={selectedMovie} /> {/* Passer le film sélectionné */}
      </DetailsContainer>
    </AppContainer>
  );
};

export default App;