import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import CountryNews from './components/CountryNews';  
import TopHeadlines from './components/TopHeadlines';
import News from './components/News';
import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/top-headlines/:category" element={<TopHeadlines />} />
        <Route path="/country/:iso" element={<CountryNews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
