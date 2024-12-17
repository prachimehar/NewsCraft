import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import countries from "./countries";

function Header() {
    const [active, setActive] = useState(false);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology", "politics"];
    const [theme, setTheme] = useState("light-theme");

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    function toggleTheme() {
        setTheme(theme === "light-theme" ? "dark-theme" : "light-theme");
    }

    return (
        <header>
            <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-around">
                <h3 className="relative heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 z-50 md-5">
                    <span className="logo">
                        <img src="" alt="News_Aggregator" />
                    </span>
                </h3>

                <ul className={`nav-ul flex gap-11 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis-4/6 md:justify-end ${active ? 'active' : ''}`}>
                    <li><Link className="no-underline font-semibold" to="/" onClick={() => setActive(!active)}> All News </Link></li>
                    <li className="dropdown-li">
                        <Link className="no-underline font-semibold flex-center gap-2" onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
                            Top-Headlines 
                        </Link>
                    </li>

                    {showCategoryDropdown && (
                        <ul className="dropdown p-2 show-dropdown">
                            {categories.map((category, index) => (
                                <li key={index}>
                                    <Link to={`/category/${category}`} className="flex gap-3" onClick={() => setActive(!active)}>
                                        <span>{category}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    <li className="dropdown-li">
                        <Link className="no-underline font-semibold flex-center gap-2" onClick={() => setShowCountryDropdown(!showCountryDropdown)}>
                            Countries 
                        </Link>
                    </li>

                    {showCountryDropdown && (
                        <ul className="dropdown p-2 show-dropdown">
                            {countries.map((element, index) => (
                                <li key={index} onClick={() => setShowCountryDropdown(!showCountryDropdown)}>
                                    <Link to={`/country/${element?.iso_2_alpha}`} className="flex gap-3" onClick={() => setActive(!active)}>
                                        <img src={`https://flagcdn.com/32x24/${element?.iso_2_alpha}.png`} alt={element?.countryName} />
                                        <span>{element?.countryName}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    <li>
                        <Link className="no-underline font-semibold" to="#" onClick={toggleTheme}>
                            <input type="checkbox" className="checkbox" id="checkbox" />
                            <label htmlFor="checkbox" className="checkbox-label">
                                <i className="fas fa-moon"></i>
                                <i className="fas fa-sun"></i>
                                <span className="ball"></span>
                            </label>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
