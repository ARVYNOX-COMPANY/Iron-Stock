"use client";

import { useState, useCallback } from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import styles from "./index.module.css";

interface SearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  debounceMs?: number;
  initialValue?: string;
}

export const Search = ({
  placeholder = "Buscar productos...",
  onSearch,
  debounceMs = 300,
  initialValue = "",
}: SearchProps) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);

      if (onSearch) {
        const timer = setTimeout(() => onSearch(value), debounceMs);
        return () => clearTimeout(timer);
      }
    },
    [onSearch, debounceMs]
  );

  const clear = () => {
    setQuery("");
    onSearch?.("");
  };

  return (
    <div className={`${styles.container} ${isFocused ? styles.focused : ""}`}>
      <IoSearchOutline
        className={`${styles.icon} ${query ? styles.iconWithValue : ""}`}
        aria-hidden="true"
      />
      <input
        type="input"
        className={styles.input}
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label="Buscar"
      />

      {query && (
        <button
          type="button"
          className={styles.clearBtn}
          onClick={clear}
          aria-label="Limpiar búsqueda"
        >
          <IoCloseOutline size={18} />
        </button>
      )}
    </div>
  );
};

export default Search;
