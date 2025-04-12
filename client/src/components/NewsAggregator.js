import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsAggregator = () => {
    const [news, setNews] = useState([]);
    const [category, setCategory] = useState("technology");
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        fetchNews();
    }, [category]);

    const fetchNews = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/top-headlines?category=${category}`);
            setNews(response.data.data.articles);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    return (
        <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-gray-900 min-h-screen"}>
            <header className="p-4 flex justify-between items-center shadow-md bg-blue-600 text-white">
                <h1 className="text-2xl font-bold">News Aggregator</h1>
                <div className="flex items-center gap-4">
                    <select
                        className="p-2 rounded bg-white text-black"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="technology">Technology</option>
                        <option value="business">Business</option>
                        <option value="sports">Sports</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="health">Health</option>
                    </select>
                    <button
                        className="px-3 py-2 bg-gray-800 text-white rounded"
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                    </button>
                </div>
            </header>

            <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.length > 0 ? news.map((article, index) => (
                    <div key={index} className="bg-white p-4 rounded shadow-md">
                        <img src={article.urlToImage} alt="news" className="w-full h-40 object-cover rounded" />
                        <h3 className="text-lg font-semibold mt-2">{article.title}</h3>
                        <p className="text-sm mt-2">{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-2 inline-block">Read More</a>
                    </div>
                )) : <p className="col-span-full text-center">No news available.</p>}
            </main>

            <footer className="p-4 text-center bg-blue-600 text-white mt-6">
                <p>&copy; 2025 News Aggregator | Built with ❤️</p>
            </footer>
        </div>
    );
};

export default NewsAggregator;
