import React, { useState, useEffect, useRef } from 'react';
import { searchMovies } from '../services/tmdbApi';
import styled from 'styled-components'; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MovieContainer = styled.div`
  width: 50%;
  height: 95vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f0f0f0;
  @media (min-width: 800px) {
    width: 70%; 
  }
`;

const MovieList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const MovieItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  margin-bottom: 8px; 
  width: 100%;
  height: 120px; 
  background-color: #e0e0e0;
  border-radius: 8px;
  text-align: center;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #d0d0d0;
  }
`;

const Poster = styled.img`
  width: 60px;
  height: auto;
  max-height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-top: 8px;
  color: #333;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;

const SearchContainer = styled.div`
  display: flex;
  height: 5vh;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #0e1217; 
  width: 50%; /* Changer à 100% pour prendre toute la largeur */
  @media (min-width: 800px) {
    width: 70%;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px; 
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: auto;
`;

const MovieSearch = ({ onMovieSelect }) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const movieContainerRef = useRef(null); 
  const [isFetching, setIsFetching] = useState(false);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await searchMovies(query, page);
      setMovies((prevMovies) => {
        const combinedMovies = [...prevMovies, ...response.data.results]
        const uniqueMovies = combinedMovies.filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.id === movie.id)
        );
        return uniqueMovies;
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const container = movieContainerRef.current;
    if (!container) return;

    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
      if (!isFetching) {
        setIsFetching(true)
        setPage((prevPage) => prevPage + 1)
      }
    }
  };

  useEffect(() => {
    if (!isFetching) return
    setIsFetching(false)
  }, [movies]);


  useEffect(() => {
    const movieContainer = movieContainerRef.current;

    if (movieContainer) {
      movieContainer.addEventListener('scroll', handleScroll)
      return () => {
        movieContainer.removeEventListener('scroll', handleScroll)
      };
    }
  }, []); 

  useEffect(() => {
    if (query) {
      fetchMovies()
    }
  }, [page])

  const handleSearch = async (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      setPage(1)
      setMovies([])
      fetchMovies()
    }
  };

  const handleMovieClick = (movie) => {
    onMovieSelect(movie)
  };

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={handleSearch}
          placeholder="Search for a movie..."
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchContainer>
      <MovieContainer ref={movieContainerRef}>
        <MovieList>
          {movies.map((movie) => (
            <MovieItem key={movie.id} onClick={() => handleMovieClick(movie)}>
              <Poster src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt={movie.title} />
              <Title>{movie.title}</Title>
            </MovieItem>
          ))}
        </MovieList>
      </MovieContainer>
    </Container>
  );
};

export default MovieSearch;
