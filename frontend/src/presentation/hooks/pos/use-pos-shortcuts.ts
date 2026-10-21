import { useEffect, type RefObject } from "react";

interface PosShortcuts {
  searchRef: RefObject<HTMLInputElement | null>;
  canCheckout: boolean;
  onCheckout: () => void;
}

export const usePosShortcuts = ({
  searchRef,
  canCheckout,
  onCheckout,
}: PosShortcuts) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === "F2" && canCheckout) {
        e.preventDefault();
        onCheckout();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchRef, canCheckout, onCheckout]);
};
