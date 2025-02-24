import React, { Suspense, lazy, useContext, useState, useEffect } from "react";
import SmoothScroller from "./components/SmoothScroller";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { ThemeContext, ThemeProvider } from "@/context/ThemeContext";
import "ldrs/quantum";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Search = lazy(() => import("@/pages/Search"));
const CardDetail = lazy(() => import("@/pages/CardDetail"));
const Admin = lazy(() => import("@/pages/admin"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const App: React.FC = () => (
  <ThemeProvider>
    <MainApp />
  </ThemeProvider>
);

const MainApp: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  const { darkMode } = themeContext;
  const loaderColor = darkMode ? "white" : "black";

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false));
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="app-container">
      <SmoothScroller />
      <Navbar />
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          {/* @ts-expect-error: Custom loader element not recognized by TypeScript */}
          <l-quantum size="45" speed="1.75" color={loaderColor}></l-quantum>
        </div>
      ) : (
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/detail" element={<CardDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      )}
    </div>
  );
};

export default App;
