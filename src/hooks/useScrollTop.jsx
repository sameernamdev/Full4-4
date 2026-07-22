import { useEffect } from "react";

const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // change to "auto" if you don't want animation
    });
  }, []);
};

export default useScrollToTop;