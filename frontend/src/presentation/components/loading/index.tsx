"use client";

import styles from "./index.module.css";

export const Loading = () => {
  return (
    <div className={styles.overlay} role="status" aria-live="polite" aria-label="Cargando">
      <div className={styles.container}>
        <div className={styles.spinner} aria-hidden="true" />
        <p className={styles.text}>Cargando...</p>
      </div>
    </div>
  );
};

export default Loading;
