import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/** Resets the viewport whenever React Router changes routes. */
export default function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    // Runs before the new route is painted, so its first visible position is top.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.key]);

  return null;
}
