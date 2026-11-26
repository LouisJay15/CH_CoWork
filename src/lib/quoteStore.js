import { useSyncExternalStore } from "react";

// The last calculator selection in this browser session, kept in memory only (nothing is stored).
let last = null;
const listeners = new Set();

export function setLastQuote(quote) {
  last = quote;
  listeners.forEach((l) => l());
}
export function getLastQuote() {
  return last;
}
export function useLastQuote() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => last,
    () => null,
  );
}
