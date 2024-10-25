import React, { useState } from 'react';

import noMovieImage from '../img/noMovie.jpeg';

import { 
  DetailsContainer, 
  Overlay, 
  Content, 
  MovieImage, 
  Overview, 
  PlaceholderContainer, 
  PlaceholderImage 
} from '../style/MovieDetail_style';


const MovieDetails = ({ movie }) => {
  const [expanded, setExpanded] = useState(false);

  if (!movie) {
    return (
      <PlaceholderContainer>
        <PlaceholderImage src={noMovieImage} alt="No movie selected" />
        <div>Select a movie to see the details</div>
      </PlaceholderContainer>
    )
  }

  const handleOverviewClick = () => {
    setExpanded((prev) => !prev)
  }

  return (
    <DetailsContainer backgroundImage={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}>
      <Overlay />
      <Content>
        <h1>{movie.title}</h1>
        {
          movie.poster_path 
          ? <MovieImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          : <MovieImage src={noMovieImage} alt={movie.title} />
        }
        <Overview expanded={expanded} onClick={handleOverviewClick}>
          {movie.overview}
        </Overview>
      </Content>
    </DetailsContainer>
  );
};

export default MovieDetails;
