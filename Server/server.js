require('dotenv').config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));



// ✅ Use the correct environment variable
const API_KEY = process.env.API_KEY;
console.log("Using API Key:", process.env.API_KEY);

if (!API_KEY) {
    console.error("🚨 API Key is missing! Check your .env file.");
    process.exit(1);
}

function fetchNews(url, res) {
    axios
        .get(url)
        .then((response) => {
            if (response.data.totalResults > 0) {
                res.json({
                    status: 200,
                    success: true,
                    message: "Successfully fetched the data",
                    data: response.data,
                });
            } else {
                res.json({
                    status: 200,
                    success: true,
                    message: "No more results to show",
                });
            }
        })
        .catch((error) => {
            res.json({
                status: 500,
                success: false,
                message: "Failed to fetch data from the API",
                error: error.message,
            });
        });
}

// ✅ All News
app.get("/all-news", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 40;
    let page = parseInt(req.query.page) || 1;
    let url = `https://newsapi.org/v2/everything?page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

// ✅ Top Headlines
app.get("/top-headlines", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 10;
    let page = parseInt(req.query.page) || 1;
    let category = req.query.category || "";
    let country = req.query.country || "in";  // Default to India

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`;

    console.log("Fetching from:", url);  // Debugging

    fetchNews(url, res);
});


// ✅ Country News
app.get('/country-news', async (req, res) => {
    console.log("Received Query Params:", req.query);  // ✅ Check what params are sent
    const { country, page, pageSize } = req.query;
    
    if (!country) return res.status(400).json({ success: false, message: "Country is required!" });

    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`);
        const data = await response.json();
        res.json({ success: true, data });
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

console.log("Fetching from URL:", `https://newsapi.org/v2/everything?q=india&apiKey=${API_KEY}`);



// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running at port ${PORT}`);
});
