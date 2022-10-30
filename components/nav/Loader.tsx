import styles from "../../styles/Loader.module.css";
import React from "react";

const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
