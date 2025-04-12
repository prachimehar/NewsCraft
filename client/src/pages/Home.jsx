import React from "react";
import { Link } from "react-router-dom";
import newsIcon from "../assets/newspapers.png";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <header className="w-full py-16 flex flex-col items-center text-center">
        <img
          src={newsIcon}
          alt="News Logo"
          className="w-28 h-28 mb-2 drop-shadow-lg"
        />
        <div className="group">
          <h1 className="text-6xl font-bold tracking-wide drop-shadow-lg transition-transform duration-300 font-[Poppins] text-[#3498db] group-hover:text-[#f39c12]">
            NewsCraft: Your World, Your Way
          </h1>
        </div>

        <p className="text-lg mt-4 max-w-2xl text-gray-300">
          one-stop destination for the latest news updates, categorized by
          topics and countries.
        </p>
      </header>

      {/* Introduction */}
      <section className="w-full px-6 text-center ">
        <div className="group">
          <h2 className="text-4xl mb-5 font-semibold tracking-wide drop-shadow-lg transition-transform duration-300 font-[Poppins] text-[#3498db] group-hover:text-[#f39c12]">
          What is NewsCraft?
          </h2>
        </div>
        <p className="text-lg mt-5 mb-3 max-w-3xl mx-auto text-gray-300 leading-relaxed">
          NewsCraft is a modern news aggregator that gathers top headlines from
          trusted sources worldwide. Stay informed with real-time updates on
          Business, Technology, Sports, and more.
        </p>
      </section>

      {/* Features */}
      <section className="w-full px-6 text-center my-10">
        <div className="group">
          <h2 className="text-4xl mb-5 font-semibold tracking-wide drop-shadow-lg transition-transform duration-300 font-[Poppins] text-[#3498db] group-hover:text-[#f39c12]">
            Why Choose NewsCraft?
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[
            {
              title: "🔴 Live Updates",
              desc: "Get real-time news updates from top sources.",
            },
            {
              title: "🌍 Country & Category-wise News",
              desc: "Browse news by Business, Sports, Technology, and more.",
            },
            {
              title: "🧩 Brain Teasers & Daily Puzzles",
              desc: "Sharpen your mind with daily challenges, crossword puzzles, and trivia!",
            },
            {
              title: "📝 Smart Notes",
              desc: "Save key insights, jot down thoughts, and organize news snippets effortlessly.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-md shadow-md border border-gray-700 hover:scale-105 hover:shadow-lg transition-transform flex flex-col items-center min-w-[200px] text-center"
            >
              <h3 className="text-lg font-semibold text-blue-300">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full px-6 text-center my-10">
        <div className="group">
          <h2 className="text-4xl mb-5 font-semibold tracking-wide drop-shadow-lg transition-transform duration-300 font-[Poppins] text-[#3498db] group-hover:text-[#f39c12]">
          How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {[
            {
              step: "1️⃣ Select a Category",
              desc: "Pick a topic like Business, Health, or Technology.",
            },
            {
              step: "2️⃣ Filter by Country",
              desc: "See news from your country or any other region.",
            },
            {
              step: "3️⃣ Stay Informed",
              desc: "Read news articles and stay updated!",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-700 hover:scale-105 hover:shadow-2xl transition-transform"
            >
              <h3 className="text-xl font-semibold text-blue-300">
                {item.step}
              </h3>
              <p className="mt-2 text-sm text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <Link
        to="/all-news"
        className="px-10 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-white text-lg font-bold shadow-lg 
             transition-all duration-300 transform hover:scale-110 hover:bg-gradient-to-l hover:from-indigo-500 hover:to-blue-500 hover:shadow-2xl"
      >
        🔍 Explore Latest News
      </Link>

      {/* Footer */}
      <footer className="w-full py-8 mt-16 bg-gray-800 text-center">
        <p className="text-gray-400">© 2025 NewsCraft. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
