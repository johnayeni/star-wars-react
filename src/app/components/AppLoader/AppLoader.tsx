import React from "react";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import styles from "./styles.module.css";

const AppLoader: React.FC = (props) => {
  return (
    <div className={styles.container}>
      <Logo className={styles.logo} />
    </div>
  );
};

export default AppLoader;
