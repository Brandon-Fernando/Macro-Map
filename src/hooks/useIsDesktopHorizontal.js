import { useEffect } from "react";
import { useState } from "react"

const useIsDesktopHorizontal = () => {
  const [isDesktopHorizontal, setIsDesktopHorizontal] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopHorizontal(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktopHorizontal;
}

export default useIsDesktopHorizontal;