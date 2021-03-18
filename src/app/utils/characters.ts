import { Character } from "../api/types";
import Genders from "../constants/Genders";
import { sortArrOfObj, SORT_TYPE } from "./helpers";

/**
 * Sort an array of characters
 * @param characters
 * @param options
 * @returns
 */
export function sortCharacters(
  characters: Array<Character>,
  {
    key,
    type,
    order,
  }: {
    key: string;
    type: SORT_TYPE;
    order: "asc" | "desc";
  }
) {
  return sortArrOfObj(characters, {
    objectKey: key,
    sortOrder: order,
    keyValueType: type,
  });
}

/**
 * Get the total height for a list of characters
 * @param characters
 * @returns
 */
export function getTotalHeightOfCharacters(characters: Array<Character>) {
  return characters.reduce((total, character) => {
    const height = isNaN(Number(character.height)) ? 0 : Number(character.height);
    return total + height;
  }, 0);
}

/**
 * Filter characters
 * @param characters
 * @param options
 * @returns
 */
export function filterCharacters(
  characters: Array<Character>,
  { key, matchValue }: { key: string; matchValue: string }
) {
  const regex = new RegExp(`^${matchValue}`, "i");
  //@ts-ignore
  return characters.filter((character) => regex.test(character[key]));
}

/**
 * Format a character's gender string to return the first character
 * @param gender
 * @returns
 */
export function formatCharacterGender(gender: string) {
  return Genders.includes(gender) ? gender.charAt(0).toUpperCase() : gender;
}
