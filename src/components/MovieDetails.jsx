// MovieDetails.js
import React from 'react';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  width: 60%; 
  padding: 20px;
  border-left: 1px solid #ccc;
`;

const MovieDetails = ({ movie }) => {
  if (!movie) {
    return <div>Select a movie to see details</div>; 
  }

  return (
    <DetailsContainer>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

    </DetailsContainer>
  );
};

export default MovieDetails;