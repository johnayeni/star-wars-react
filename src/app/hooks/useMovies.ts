import * as React from "react";
import api from "../api";
import { Movie } from "../api/types";
import { parseMovies, sortMovies } from "../utils/movies";

type Status = "idle" | "fetching" | "fetched" | "error";

interface State {
  movies: Array<Movie>;
  status: Status;
  error: string | null;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = { movies: [], status: "idle", error: null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "pending":
      return {
        ...state,
        status: "fetching",
        error: null,
      };
    case "failed":
      return {
        ...state,
        status: "error",
        error: action.payload.error,
      };
    case "success":
      return {
        ...state,
        status: "fetched",
        movies: action.payload.movies,
      };
    default:
      return state;
  }
}

export default function useMovies() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const fetchMovies = async () => {
    try {
      dispatch({ type: "pending" });
      const response = await api.fetchMovies();
      const movies = JSON.parse(response.contents)?.results;
      const sortedMovies = sortMovies(movies);
      const parsedMovies = parseMovies(sortedMovies);
      dispatch({ type: "success", payload: { movies: parsedMovies } });
    } catch (error) {
      dispatch({ type: "failed", payload: { error: error.message } });
    }
  };

  React.useEffect(() => {
    fetchMovies();
  }, []);

  return { ...state, reload: fetchMovies };
}
