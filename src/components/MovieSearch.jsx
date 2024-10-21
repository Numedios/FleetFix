import React, { useState } from 'react';
import { searchMovies } from '../services/tmdbApi';
import styled from 'styled-components'; 

const Poster = styled.img`
  width: 50px;
  height: 80px;
  margin: 5px;
`;

const MovieList = styled.li`
  display: flex;
  align-items: center;
  border : 1px solid red;
  width: 300px;
  height: 100px;
`;


const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    if (e.key === 'Enter' || e.type === 'click')
    {
      try {
        const response = await searchMovies(query);
        setMovies(response.data.results);
        console.log(response)
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={handleSearch}
        placeholder="Search for a movie..."
      />
      <button  onClick={handleSearch}>Search</button>
      <ul>
        {movies.map((movie) => (
          <MovieList key={movie.id}>
            <Poster src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}/>
            <p>{movie.title}</p></MovieList>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;