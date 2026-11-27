import { useEffect, useState, useSyncExternalStore } from "react";

export function useMediaQuery(query) {
  const subscribe = (cb) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", cb);
    return () => mql.removeEventListener("change", cb);
  };
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
export const useIsDesktop = () => useMediaQuery("(min-width: 768px)");
/** True on a computer with a mouse or trackpad; false on phones and tablets. Heavier effects run only here. */
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");

/** True when the visitor asked to save data, or the connection is 2g. */
export function useSaveData() {
  const read = () => {
    const c = typeof navigator !== "undefined" ? navigator.connection : null;
    return Boolean(c && (c.saveData || c.effectiveType === "2g" || c.effectiveType === "slow-2g"));
  };
  const [save, setSave] = useState(read);
  useEffect(() => {
    const c = navigator.connection;
    if (!c) return undefined;
    const on = () => setSave(read());
    c.addEventListener?.("change", on);
    return () => c.removeEventListener?.("change", on);
  }, []);
  return save;
}

export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return scrolled;
}
