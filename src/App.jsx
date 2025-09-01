import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async (query) => {
    // Define API data
    const BASE_API_URL = "https://api.themoviedb.org/3/";
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const endpoint = `${BASE_API_URL}/search/movie?query=${query}`;

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
    fetchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern"></div>

      <div className="wrapper">
        <header>
          <img src="hero.png" alt="Films" />
          <h1 className="text-white font-bold text-3xl">
            Watch <span className="text-gradient">Movies</span> Here
          </h1>
        </header>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {isLoading ? (
          <h3 className="text-gradient">Loading ...</h3>
        ) : errorMessage ? (
          <h3 className="text-red-500">{errorMessage}</h3>
        ) : (
          <ul>
            {movies.map((movie) => (
              <li className="text-white" key={movie.id}>
                {movie.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default App;
