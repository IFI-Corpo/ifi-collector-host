import React, { Suspense, lazy } from "react";
import SmoothScroller from "./components/SmoothScroller";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Search = lazy(() => import("@/pages/Search"));
const CardDetail = lazy(() => import("@/pages/CardDetail"));
const Admin = lazy(() => import("@/pages/admin"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const App: React.FC = () => (
  <ThemeProvider>
    <div className="app-container">
      <SmoothScroller />
      <Navbar />
      <Suspense
        fallback={
          <div className="app-loading">
            <h1>Loading</h1>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail" element={<CardDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  </ThemeProvider>
);

export default App;
