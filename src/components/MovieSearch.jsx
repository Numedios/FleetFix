import React, { useState, useEffect, useRef, useCallback } from 'react';
import { searchMovies, getPopularMovies } from '../services/tmdbApi';

import noMovieImage from '../img/noMovie.jpeg';
import { 
  Container, 
  MovieContainer, 
  MovieList, 
  MovieItem, 
  Poster, 
  Title, 
  SearchContainer, 
  SearchInput, 
  SearchButton 
} from '../style/MovieSearch_style';

const MovieSearch = ({ onMovieSelect }) => {
  const [query, setQuery] = useState('');
  const [prevQuery, setPrevQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const movieContainerRef = useRef(null); 
  const [isFetching, setIsFetching] = useState(false);

  const fetchMovies = useCallback(async () => {
    try {
      let response;
      if (query.trim() === '') {
        response = await getPopularMovies(page)
      } else {
        response = await searchMovies(query, page)
      }
  
      setMovies((prevMovies) => {
        const combinedMovies = [...prevMovies, ...response.data.results];
        const uniqueMovies = combinedMovies.filter(
          (movie, index, self) =>
            index === self.findIndex((m) => m.id === movie.id)
        );
        return uniqueMovies
      });
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }, [query, page]);

  const handleScroll = useCallback(() => {
    const container = movieContainerRef.current;
    if (!container) return

    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
      if (!isFetching) {
        setIsFetching(true)
        setPage((prevPage) => prevPage + 1)
      }
    }
  }, [isFetching]);

  useEffect(() => {
    if (!isFetching) return
    fetchMovies()
    setIsFetching(false)
  }, [isFetching, fetchMovies])

  useEffect(() => {
    const movieContainer = movieContainerRef.current;

    if (movieContainer) {
      movieContainer.addEventListener('scroll', handleScroll)
      return () => {
        movieContainer.removeEventListener('scroll', handleScroll)
      };
    }
  }, [handleScroll])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (query !== prevQuery) {
        setPage(1)
        setMovies([])
        setQuery(prevQuery)
      }
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
          value={prevQuery}
          onChange={(e) => setPrevQuery(e.target.value)}
          onKeyUp={handleSearch}
          placeholder="Search for a movie..."
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchContainer>
      <MovieContainer ref={movieContainerRef}>
        <MovieList>
          {movies.map((movie) => (
            <MovieItem key={movie.id} onClick={() => handleMovieClick(movie)}>
              {movie.poster_path
                ? <Poster src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt={movie.title} />
                : <Poster src={noMovieImage} alt={movie.title} />
              }
              <Title>{movie.title}</Title>
            </MovieItem>
          ))}
        </MovieList>
      </MovieContainer>
    </Container>
  );
};

export default MovieSearch;
