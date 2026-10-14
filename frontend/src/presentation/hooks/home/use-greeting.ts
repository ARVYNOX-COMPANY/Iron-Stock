"use client";

import { useSyncExternalStore } from "react";
import { getGreeting } from "@/presentation/utils/home";

const MINUTE = 60_000;

const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, MINUTE);
  return () => clearInterval(id);
};

// Redondeado al minuto para que el valor sea estable entre renders
const getSnapshot = () => Math.floor(Date.now() / MINUTE) * MINUTE;
const getServerSnapshot = () => null;

const dateFormat = new Intl.DateTimeFormat("es-PE", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export const useGreeting = () => {
  const timestamp = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (timestamp === null) return { greeting: null, dateLabel: "" };

  const now = new Date(timestamp);
  const label = dateFormat.format(now);

  return {
    greeting: getGreeting(now),
    dateLabel: label.charAt(0).toUpperCase() + label.slice(1),
  };
};
