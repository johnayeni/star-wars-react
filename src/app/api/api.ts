import { ProxyResponse } from "./types";

const API_URL = process.env.REACT_APP_API_URL;
const PROXY = process.env.REACT_APP_CORS_PROXY;

const fetchMovies = async (): Promise<ProxyResponse> =>
  (await fetch(`${PROXY}${API_URL}/films`)).json();

const fetchCharacter = async (characterUrl: string): Promise<ProxyResponse> =>
  (await fetch(`${PROXY}${characterUrl}`)).json();

const api = { fetchMovies, fetchCharacter };

export default api;
