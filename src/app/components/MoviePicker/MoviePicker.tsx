import React from "react";

import { Movie } from "../../api/types";
import styles from "./styles.module.css";

interface Props {
  movies: Array<Movie>;
  selectedMovieEpisode: string | null;
  handleSetSelectedMovieEpisode: (movieEpisode: string) => void;
}

const MoviePicker: React.FC<Props> = ({
  movies,
  selectedMovieEpisode,
  handleSetSelectedMovieEpisode,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleSetSelectedMovieEpisode(e.target.value);
  };

  return (
    <header className={styles.container}>
      <label className={styles.label} htmlFor="movie">
        Star Wars Movies
      </label>
      <select
        id="movie"
        className={styles.select}
        title="Star Wars Movies"
        value={selectedMovieEpisode || undefined}
        onChange={handleChange}
      >
        <option>Pick a movie</option>
        {movies.map((movie) => (
          <option key={movie.episode_id} value={movie.episode_id}>
            {movie.title}
          </option>
        ))}
      </select>
    </header>
  );
};

export default MoviePicker;
