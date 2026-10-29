"use client";

import { useSyncExternalStore } from "react";

const subscribe = (onResize) => {
  window.addEventListener("resize", onResize);
  return () => window.removeEventListener("resize", onResize);
};

const getSnapshot = () => window.innerWidth;

// The server has no viewport, so report 0 and let the client take over after hydration.
const getServerSnapshot = () => 0;

export default function useWindowWidth() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
