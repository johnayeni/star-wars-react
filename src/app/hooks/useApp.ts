import * as React from "react";

import useMovies from "./useMovies";
import useCharacters from "./useCharacters";
import { Movie, Character } from "../api/types";
import { filterCharacters, getTotalHeightOfCharacters } from "../utils/characters";
import { mapArrayOfObjToObj, sortArrOfObj } from "../utils/helpers";

export type Order = "asc" | "desc" | "";

interface State {
  movies: { [movieEpisode: string]: Movie };
  characters: Array<Character>;
  sort: {
    name: Order;
    gender: Order;
    height: Order;
  };
  genderFilter: string;
  selectedMovieEpisode: string | null;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
  movies: {},
  characters: [],
  sort: { name: "", gender: "", height: "" },
  genderFilter: "",
  selectedMovieEpisode: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "set_movies":
      return {
        ...state,
        movies: action.payload.movies,
      };
    case "set_characters":
      return {
        ...state,
        characters: action.payload.characters,
      };
    case "set_selected_movie":
      return {
        ...state,
        selectedMovieEpisode: action.payload.selectedMovieEpisode,
      };
    case "set_gender_filter":
      return {
        ...state,
        genderFilter: action.payload.filter,
      };
    case "set_sort":
      return {
        ...state,
        sort: {
          ...initialState.sort,
          // @ts-ignore
          [action.payload.key]: state.sort[action.payload.key]
            ? // @ts-ignore
              state.sort[action.payload.key] === "asc"
              ? "desc"
              : "asc"
            : "asc",
        },
      };
    default:
      return state;
  }
}

export default function useApp() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const {
    movies,
    status: moviesStatus,
    error: moviesError,
    reload: handleReloadMovies,
  } = useMovies();

  const selectedMovie = React.useMemo(
    () => (state.selectedMovieEpisode ? state.movies[state.selectedMovieEpisode] : null),
    [state.movies, state.selectedMovieEpisode]
  );

  const {
    characters,
    status: charactersStatus,
    error: charactersError,
    reload: handleReloadCharacters,
  } = useCharacters(String(selectedMovie?.episode_id || ""), selectedMovie?.characters || []);

  const totalHeightOfCharacters = React.useMemo(() => getTotalHeightOfCharacters(state.characters), [
    state.characters,
  ]);

  const handleSetSelectedMovieEpisode = (selectedMovieEpisode: string) => {
    dispatch({ type: "set_selected_movie", payload: { selectedMovieEpisode } });
  };

  const handleChangeGenderFilter = (filter: string) => {
    dispatch({ type: "set_gender_filter", payload: { filter } });
  };

  const toggleSortOrder = (key: string) => () => {
    dispatch({ type: "set_sort", payload: { key } });
  };

  React.useEffect(() => {
    const mappedMovies = mapArrayOfObjToObj(movies, "episode_id");
    dispatch({ type: "set_movies", payload: { movies: mappedMovies } });
  }, [movies]);

  React.useEffect(() => {
    let filteredCharacters = characters;

    if (state.genderFilter) {
      filteredCharacters = filterCharacters(characters, {
        key: "gender",
        matchValue: state.genderFilter,
      });
    }

    if (state.sort.name) {
      const sortedCharacters = sortArrOfObj(filteredCharacters, {
        objectKey: "name",
        sortOrder: state.sort.name,
        keyValueType: "string",
      });
      dispatch({ type: "set_characters", payload: { characters: sortedCharacters } });
    } else if (state.sort.height) {
      const sortedCharacters = sortArrOfObj(filteredCharacters, {
        objectKey: "height",
        sortOrder: state.sort.height,
        keyValueType: "number",
      });
      dispatch({ type: "set_characters", payload: { characters: sortedCharacters } });
    } else if (state.sort.gender) {
      const sortedCharacters = sortArrOfObj(filteredCharacters, {
        objectKey: "gender",
        sortOrder: state.sort.gender,
        keyValueType: "string",
      });
      dispatch({ type: "set_characters", payload: { characters: sortedCharacters } });
    } else {
      dispatch({ type: "set_characters", payload: { characters: filteredCharacters } });
    }
  }, [characters, state.genderFilter, state.sort]);

  return {
    ...state,
    movies,
    selectedMovie,
    totalHeightOfCharacters,
    isMoviesLoading: movies.length < 1 && moviesStatus === "fetching",
    isMoviesError: movies.length < 1 && moviesError,
    moviesError,
    isCharactersLoading: charactersStatus === "fetching",
    isCharactersError: charactersStatus === "error",
    charactersError,
    handleSetSelectedMovieEpisode,
    handleChangeGenderFilter,
    toggleSortOrder,
    handleReloadMovies,
    handleReloadCharacters,
  };
}
