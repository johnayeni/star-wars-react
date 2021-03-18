import * as React from "react";
import api from "../api";
import { Character } from "../api/types";

const cache: { [movieEpisode: string]: Array<Character> } = {};

type Status = "idle" | "fetching" | "fetched" | "error";

interface State {
  characters: Array<Character>;
  status: Status;
  error: string | null;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = { characters: [], status: "idle", error: null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "pending":
      return {
        ...state,
        characters: [],
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
        characters: action.payload.characters,
      };
    default:
      return state;
  }
}

export default function useCharacters(movieEpisode: string, characterUrls: Array<string>) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const fetchCharacters = React.useCallback(async () => {
    try {
      dispatch({ type: "pending" });
      const cachedCharacters = cache[movieEpisode];

      if (cachedCharacters) {
        dispatch({ type: "success", payload: { characters: cachedCharacters } });
      } else {
        const responses = await Promise.all(characterUrls.map(api.fetchCharacters));
        const characters = responses.map((response) => JSON.parse(response.contents));
        cache[movieEpisode] = characters;
        dispatch({ type: "success", payload: { characters: characters } });
      }
    } catch (error) {
      dispatch({ type: "failed", payload: { error: error.message } });
    }
  }, [characterUrls, movieEpisode]);

  React.useEffect(() => {
    if (movieEpisode && characterUrls.length > 0) {
      fetchCharacters();
    }
  }, [movieEpisode, characterUrls, fetchCharacters]);

  return { ...state, reload: () => fetchCharacters() };
}
