import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import AllNews from "./components/AllNews";
import TopHeadlines from "./components/TopHeadlines";
import PuzzlePage from "./pages/puzzlePage";
import NotesPage from "./pages/NotesPage";
import Home from "./pages/Home";
import CountryNews from "./components/CountryNews";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const [theme, setTheme] = useState("dark-theme");

  useEffect(() => {
    document.body.className = theme; // Apply theme class
    localStorage.setItem("theme", theme); // Save preference
  }, [theme]);
  
  return (
    <div className="w-full">
      <BrowserRouter>
        <Header theme={theme} setTheme={setTheme} /> {/* Pass theme and setTheme */}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/all-news" element={<AllNews />} />
          <Route path="/top-headlines/:category" element={<TopHeadlines />} />
          <Route path="/country/:iso" element={<CountryNews />} />
          <Route path="/puzzle" element={<PuzzlePage />} />
          <Route path="/notes" element={<NotesPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


