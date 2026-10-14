"use client";

import styles from "./index.module.css";

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

export const Loading = ({ text = "Cargando", fullScreen = false }: LoadingProps) => {
  return (
    <div
      className={fullScreen ? styles.overlay : styles.inline}
      role="status"
      aria-live="polite"
    >
      <div className={styles.container}>
        <p className={styles.text}>
          {text}
          <span className={styles.dots} aria-hidden="true" />
        </p>
        <div className={styles.spinner} aria-hidden="true" />
      </div>
    </div>
  );
};

export default Loading;
