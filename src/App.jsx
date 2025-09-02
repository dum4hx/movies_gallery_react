import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    300,
    [searchTerm]
  );

  const fetchMovies = async (query) => {
    // Clear movie list
    setMovies([]);
    setIsLoading(true);

    // Define API data
    const BASE_API_URL = "https://api.themoviedb.org/3/";
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const endpoint = query ? `${BASE_API_URL}/search/movie?query=${query}` : `${BASE_API_URL}/discover/movie`;

    const API_OPTIONS = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    try {
      const response = await fetch(endpoint, API_OPTIONS);

      // Check response status
      if (!response.ok) {
        throw new Error();
      }

      // Get data
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      setErrorMessage("Error getting the movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="hero.png" alt="Films" />
          <h1 className="text-white font-bold text-3xl">
            Watch <span className="text-gradient">Movies</span> Here
          </h1>

          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2>All movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <h3 className="text-red-500">{errorMessage}</h3>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
