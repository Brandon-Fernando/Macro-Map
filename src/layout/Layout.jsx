import React, { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import "./Layout.css";
import useIsDesktop from "../hooks/useIsDesktop";

export default function Layout({ children }) {
  const location = useLocation();
  const contentRef = useRef(null);
  const isDesktop = useIsDesktop();

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      contentRef.current?.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });
  }, [location.pathname]);

  return (
    <div className="app-container">
      {isDesktop && <NavBar />}

      <div className="content" ref={contentRef}>
        {!isDesktop && <NavBar />}
        {children}
      </div>
    </div>
  );
}