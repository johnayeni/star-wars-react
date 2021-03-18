import React from "react";
import styles from "./styles.module.css";

interface Props {
  content: string;
}

const Crawl: React.FC<Props> = ({ content }) => {
  return (
    <section className={styles.container}>
      <h2>Synopsis</h2>
      <article className={`${styles.crawl} fade-in`}>
        <p>{content}</p>
      </article>
    </section>
  );
};

export default Crawl;
