import React, { useState, useEffect } from 'react';
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
  border : 1px solid white;
  width: 300px;
  height: 100px;
`;


const MovieSearch = () => {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await searchMovies(query, page)
      setMovies((prevMovies) => [...prevMovies, ...response.data.results])
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
      if (!loading) { 
        setPage((prevPage) => prevPage + 1); // Incrémente la page
      }
    }
  };

  useEffect(() => {
    if (query) {
      fetchMovies();
    }
  }, [page]); 

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    console.log("scrol")
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = async (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      setMovies([])
      setPage(1)
      fetchMovies()
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