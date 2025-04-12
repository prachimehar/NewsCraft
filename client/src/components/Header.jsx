import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import countries from "./countries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown } from "@fortawesome/free-solid-svg-icons";
import newsIcon from "../assets/newspapers.png"; // Adjusted path if needed

function Header() {
  const [active, setActive] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Get theme from localStorage or default to dark-theme
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark-theme"
  );

  useEffect(() => {
    document.body.className = theme; // Apply theme class
    localStorage.setItem("theme", theme); // Save preference
  }, [theme]);

  // Toggle between light and dark theme
  function toggleTheme() {
    setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
  }

  let category = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
    "politics",
  ];

  return (
    <header>
      <nav className="sticky top-0 left-0 w-full z-10 flex items-center justify-around py-7 px-5">
        <h3 className="text-2xl font-bold">
          <Link
            to="/Home"
            className="flex items-center gap-2 no-underline text-white"
          >
            <img src={newsIcon} alt="News Icon" className="w-9 h-9" />
            NewsCraft
          </Link>
        </h3>

        <ul
          className={`nav-ul flex items-center gap-11 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis-4/6 md:justify-end ml-10 ${
            active ? "active" : ""
          }`}
        >
          <li>
            <Link
              className="no-underline font-semibold text-white whitespace-nowrap"
              to="/home"
              onClick={() => setActive(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="no-underline font-semibold text-white whitespace-nowrap"
              to="/all-news"
              onClick={() => setActive(false)}
            >
              All News
            </Link>
          </li>

          <li className="dropdown-li relative">
            <button
              className="no-underline font-semibold flex items-center gap-2 text-white whitespace-nowrap"
              onClick={() => {
                setShowCategoryDropdown(!showCategoryDropdown);
                setShowCountryDropdown(false);
              }}
            >
              Top-Headlines{" "}
              <FontAwesomeIcon
                className={`down-arrow-icon ${
                  showCategoryDropdown ? "down-arrow-icon-active" : ""
                }`}
                icon={faCircleArrowDown}
              />
            </button>
            <ul
              className={`dropdown p-2 absolute left-0 top-full rounded-md ${
                showCategoryDropdown ? "show-dropdown" : "hidden"
              }`}
            >
              {category.map((element, index) => (
                <li key={index} onClick={() => setShowCategoryDropdown(false)}>
                  <Link
                    to={`/top-headlines/${element}`}
                    className="flex items-center gap-3 capitalize text-white px-3 py-1"
                    onClick={() => setActive(false)}
                  >
                    {element}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li className="dropdown-li relative">
            <button
              className="no-underline font-semibold flex items-center gap-2 text-white whitespace-nowrap"
              onClick={() => {
                setShowCountryDropdown(!showCountryDropdown);
                setShowCategoryDropdown(false);
              }}
            >
              Country{" "}
              <FontAwesomeIcon
                className={`down-arrow-icon ${
                  showCountryDropdown ? "down-arrow-icon-active" : ""
                }`}
                icon={faCircleArrowDown}
              />
            </button>
            <ul
              className={`dropdown p-2 absolute left-0 top-full rounded-md ${
                showCountryDropdown ? "show-dropdown" : "hidden"
              }`}
            >
              {countries.map((element, index) => (
                <li key={index} onClick={() => setShowCountryDropdown(false)}>
                  <Link
                    to={`/country/${element?.iso_2_alpha}`}
                    className="flex items-center gap-3 text-white px-3 py-1"
                    onClick={() => setActive(false)}
                  >
                    <img
                      src={element?.png}
                      srcSet={`https://flagcdn.com/32x24/${element?.iso_2_alpha}.png 2x`}
                      alt={element?.countryName}
                      className="w-5 h-4"
                    />
                    <span>{element?.countryName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li>
            <Link
              to="/puzzle"
              className="text-white whitespace-nowrap"
              onClick={() => setActive(false)}
            >
              Puzzle
            </Link>
          </li>
          <li>
            <Link
              to="/notes"
              className="text-white whitespace-nowrap"
              onClick={() => setActive(false)}
            >
              Notes
            </Link>
          </li>

          {/* Theme Toggle */}
          <button
          onClick={toggleTheme}
          className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-full"
        >
          {theme === "light-theme" ? "🌙" : "☀"}
        </button>
        </ul>

        {/* Hamburger Menu */}
        <div
          className={active ? "ham-burger ham-open" : "ham-burger"}
          onClick={() => setActive(!active)}
        >
          <span className="lines line-1"></span>
          <span className="lines line-2"></span>
          <span className="lines line-3"></span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
