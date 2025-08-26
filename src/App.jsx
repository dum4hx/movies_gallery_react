import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// Build card component
const Card = ({ movie }) => {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(-1);

  useEffect(() => {
    setCount((prevCount) => prevCount + 1);
  }, [liked]);

  return (
    <div className="card">
      <h1>{movie.name}</h1>
      <h1>{count}</h1>
      <h3>{movie.author}</h3>

      <button onClick={() => setLiked(!liked)} className="like-btn">
        {liked ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

// Build app component
const App = () => {
  const movies = [
    { name: "Avatar", author: "Michael Dante DiMartino" },
    { name: "Avengers Endgame", author: "Crhistopher Markus" },
    { name: "A beautifull mind", author: "Unkown" },
  ];
  return (
    <div className="card-container">
      <Card movie={movies[0]}></Card>
      <Card movie={movies[1]}></Card>
      <Card movie={movies[2]}></Card>
    </div>
  );
};

export default App;
