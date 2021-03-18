import React from "react";
import Loader from "../Loader";
import Error from "../Error";
import { Character } from "../../api/types";
import { Order } from "../../hooks/useApp";
import { convertCentimetersToFeetAndInches } from "../../utils/helpers";
import styles from "./styles.module.css";
import Genders from "../../constants/Genders";
import { formatCharacterGender } from "../../utils/characters";

interface Props {
  characters: Array<Character>;
  sort: {
    name: Order;
    gender: Order;
    height: Order;
  };
  totalHeight: number;
  genderFilter: string;
  loading: boolean;
  error: boolean;
  errorMessage: string;
  handleChangeGenderFilter: (filter: string) => void;
  toggleSortOrder: (key: string) => () => void;
  reload: () => void;
}

const CharactersTable: React.FC<Props> = ({
  characters,
  sort,
  totalHeight,
  genderFilter,
  loading,
  error,
  errorMessage,
  handleChangeGenderFilter,
  toggleSortOrder,
  reload,
}) => {
  const filterOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChangeGenderFilter(e.target.value);
  };

  const totalHightInFeetAndInches = convertCentimetersToFeetAndInches(totalHeight);

  const heightTotalsText = `Total height: ${totalHeight} cm (${totalHightInFeetAndInches.feet}ft/${totalHightInFeetAndInches.inches}in)`;

  return (
    <section className={styles.container}>
      <h2>Characters</h2>
      {error ? (
        <Error errorMessage={errorMessage} handleReload={reload} />
      ) : (
        <>
          {!loading && (
            <div className={styles.filter}>
              <label>Gender</label>
              <select value={genderFilter} onChange={filterOnChange} title="Gender">
                <option>Gender</option>
                {Genders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>
          )}
          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={toggleSortOrder("name")}>
                  Name &nbsp;{sort.name ? sort?.name === "asc" ? <>&uarr;</> : <>&darr;</> : ""}
                </th>
                <th onClick={toggleSortOrder("gender")}>
                  Gender &nbsp;
                  {sort.gender ? sort?.gender === "asc" ? <>&uarr;</> : <>&darr;</> : ""}
                </th>
                <th onClick={toggleSortOrder("height")}>
                  Height &nbsp;
                  {sort.height ? sort?.height === "asc" ? <>&uarr;</> : <>&darr;</> : ""}
                </th>
              </tr>
            </thead>
            {!loading && (
              <>
                <tbody>
                  {characters.map((character) => (
                    <tr key={JSON.stringify(character)}>
                      <td>{character.name}</td>
                      <td>{formatCharacterGender(character.gender)}</td>
                      <td>{character.height} cm</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td>{characters.length} characters</td>
                    <td colSpan={2}>{heightTotalsText}</td>
                  </tr>
                </tfoot>
              </>
            )}
          </table>
          {loading && <Loader />}
        </>
      )}
    </section>
  );
};

export default CharactersTable;
