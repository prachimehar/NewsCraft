import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newsIcon from "../assets/newspapers.png";
import { useAuth } from "../auth.jsx";

function Header() {
  const [active, setActive] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    setActive(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    setProfileOpen(false);
    setActive(false);
    navigate("/home");
  }

  const displayName = user?.name || user?.email || "Profile";
  const profileInitial = displayName.charAt(0).toUpperCase();

  return (
    <header>
      <nav className="sticky top-0 left-0 w-full z-10 flex items-center justify-between py-7 px-5 md:px-10">
        <h3 className="text-2xl font-bold">
          <Link
            to="/home"
            className="flex items-center gap-2 no-underline text-white"
          >
            <img src={newsIcon} alt="News Icon" className="w-9 h-9" />
            NewsCraft
          </Link>
        </h3>

        <ul
          className={`nav-ul flex items-center gap-8 md:gap-10 ${
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
          <li className="relative" ref={profileRef}>
            {user ? (
              <>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white shadow-md"
                  aria-label="Open profile menu"
                  aria-expanded={profileOpen}
                  onClick={() => setProfileOpen((open) => !open)}
                >
                  {profileInitial}
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-12 w-56 rounded-md border border-slate-200 bg-white py-2 text-slate-900 shadow-xl">
                    <div className="border-b border-slate-200 px-4 py-2">
                      <p className="truncate font-semibold text-slate-900">
                        {user.name || "Signed in"}
                      </p>
                      {user.email && (
                        <p className="truncate text-sm text-slate-600">
                          {user.email}
                        </p>
                      )}
                    </div>
                    <button
                      className="w-full px-4 py-2 text-left font-semibold text-slate-900 hover:bg-slate-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="text-white whitespace-nowrap"
                onClick={() => setActive(false)}
              >
                Login
              </Link>
            )}
          </li>
        </ul>

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
