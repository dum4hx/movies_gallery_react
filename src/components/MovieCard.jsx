import React from "react";

const MovieCard = ({ movie: { title, vote_average, poster_path, release_date, original_language } }) => {
  const posterUrl = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : "no-movie.png";
  return (
    <li>
      <div className="movie-card">
        {/* Poster */}
        <img src={posterUrl} alt="" />
        <div className="mt-4" />
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star icon" />
            {/* Rating */}
            <p>{vote_average ? vote_average.toFixed(1) : "No rating"}</p>
            {/* Original language */}
            <span>&#183;</span>
            <p className="lang">{original_language}</p>
            <span>&#183;</span>
            {/* Year */}
            <p className="year">{release_date ? release_date.split("-") : "Unkown"}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MovieCard;
