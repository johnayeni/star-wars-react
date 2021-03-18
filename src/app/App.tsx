import React from "react";

import useApp from "./hooks/useApp";

import AppLoader from "./components/AppLoader";
import MoviePicker from "./components/MoviePicker";
import Crawl from "./components/Crawl";
import CharactersTable from "./components/CharactersTable";
import Error from "./components/Error";
import { ReactComponent as Logo } from "./assets/img/logo.svg";

import styles from "./styles/app.module.css";

function App() {
  const {
    movies,
    characters,
    sort,
    genderFilter,
    selectedMovieEpisode,
    selectedMovie,
    totalHeightOfCharacters,
    isMoviesLoading,
    isMoviesError,
    moviesError,
    isCharactersLoading,
    isCharactersError,
    charactersError,
    toggleSortOrder,
    handleSetSelectedMovieEpisode,
    handleChangeGenderFilter,
    handleReloadMovies,
    handleReloadCharacters,
  } = useApp();

  if (isMoviesError) {
    return <Error errorMessage={moviesError || ""} handleReload={handleReloadMovies} />;
  }

  if (isMoviesLoading) {
    return <AppLoader />;
  }

  return (
    <div className={styles.app}>
      <MoviePicker {...{ movies, selectedMovieEpisode, handleSetSelectedMovieEpisode }} />
      {selectedMovie ? (
        <main className={styles.body}>
          <Crawl key={selectedMovie.episode_id} content={selectedMovie.opening_crawl} />
          <CharactersTable
            {...{
              characters,
              sort,
              genderFilter,
              handleChangeGenderFilter,
              toggleSortOrder,
              totalHeight: totalHeightOfCharacters,
              error: isCharactersError,
              errorMessage: charactersError || "",
              loading: isCharactersLoading,
              reload: handleReloadCharacters,
            }}
          />
        </main>
      ) : (
        <Logo className={styles.logo} />
      )}
    </div>
  );
}

export default App;
