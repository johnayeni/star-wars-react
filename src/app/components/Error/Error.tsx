import React from "react";
import { ReactComponent as ErrorIcon } from "../../assets/img/error.svg";
import styles from "./styles.module.css";

interface Props {
  errorMessage: string;
  handleReload: () => void;
}

const Error: React.FC<Props> = ({ errorMessage, handleReload }) => {
  return (
    <div className={styles.container}>
      <ErrorIcon className={styles.icon} />
      <h2>Error Occurred</h2>
      <p>{errorMessage}</p>
      <button type="button" onClick={handleReload}>
        Reload
      </button>
    </div>
  );
};

export default Error;
