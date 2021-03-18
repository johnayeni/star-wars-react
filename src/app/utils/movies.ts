import { sortArrOfObj } from "./helpers";
import { Movie } from "../api/types";

/**
 * Sort and array of movies
 * @param movies
 * @returns
 */
export function sortMovies(movies: Array<Movie>) {
  return sortArrOfObj(movies, {
    objectKey: "release_date",
    sortOrder: "desc",
    keyValueType: "date",
  });
}
/**
 * Remove unnecessary data from movies
 * @param movies
 * @returns
 */
export function parseMovies(movies: Array<Movie>) {
  return movies.map((movie) => {
    const {
      director,
      producer,
      planets,
      starships,
      vehicles,
      species,
      created,
      edited,
      url,
      episode_id,
      ...rest
    } = movie;

    return { ...rest, episode_id: String(episode_id) };
  });
}
