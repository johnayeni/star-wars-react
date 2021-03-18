import React from "react";
import styles from "./styles.module.css";

const Loader: React.FC = (props) => {
  return (
    <div className={`${styles.container} fade-in`}>
      <div className={styles.loader} />
    </div>
  );
};

export default Loader;
