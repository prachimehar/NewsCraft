import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import countries from "./countries";

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

function navClass({ isActive }) {
  return `
    block px-4 py-2.5
    ncf-mono text-xs tracking-wider font-medium
    border-b border-[#CFC2A7]
    transition-all duration-200
    ${
      isActive
        ? "bg-[#1C2230] !text-[#EFE6D3]"
        : "!text-[#1C2230] hover:bg-[#D9CEB7] hover:!text-[#C41230]"
    }
  `;
}

function NewsLayout() {
  const [showHeadlines, setShowHeadlines] = useState(false);
  const [showCountries, setShowCountries] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-55px)] w-full flex-col md:flex-row bg-[#EFE6D3]">

    {/* ================= SIDEBAR ================= */}
    <aside
      className="
        md:w-64
        md:shrink-0
        md:self-stretch
        md:min-h-[calc(100vh-55px)]
      "
    >
      <div
        className="
          min-h-full
          bg-[#E7DDC8]
          border-r
          border-[#CFC2A7]
          px-4
          py-5
        "
        aria-label="News sections"
      >
          {/* ================= SIDEBAR HEADER ================= */}
          <div className="border-b-2 border-[#1C2230] pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C41230]" />

              <p className="ncf-mono text-[10px] tracking-[0.25em] text-[#C41230]">
                NEWSCRAFT
              </p>
            </div>

            <h2 className="ncf-display text-xl font-bold text-[#1C2230] mt-1">
              News Desk
            </h2>

            <div className="mt-3 flex items-center gap-2">
              <span className="h-px w-8 bg-[#C41230]" />

              <span className="ncf-mono text-[9px] tracking-widest text-[#1C2230]/50">
                EDITION MENU
              </span>
            </div>
          </div>

          {/* ================= NAVIGATION ================= */}
          <div className="space-y-1">
            {/* ALL NEWS */}
            <NavLink to="/all-news" className={navClass}>
              ALL NEWS
            </NavLink>

            {/* ================= TOP HEADLINES ================= */}
            <div>
              <button
                type="button"
                className="
                  flex w-full items-center justify-between
                  px-4 py-2.5
                  text-left
                  ncf-mono text-xs tracking-wider font-semibold
                  !text-[#1C2230]
                  border-b border-[#CFC2A7]
                  transition-all duration-200
                  hover:bg-[#D9CEB7]
                  hover:!text-[#C41230]
                "
                onClick={() => setShowHeadlines((show) => !show)}
                aria-expanded={showHeadlines}
              >
                <span className="!text-[#1C2230]">TOP HEADLINES</span>

                <span className="text-xs !text-[#C41230]">
                  {showHeadlines ? "▲" : "▼"}
                </span>
              </button>

              {showHeadlines && (
                <div className="mt-1 space-y-0.5 pl-3 border-l-2 border-[#C41230]">
                  {categories.map((category) => (
                    <NavLink
                      key={category}
                      to={`/top-headlines/${category}`}
                      className={({ isActive }) =>
                        `
                        block px-3 py-2
                        text-xs capitalize
                        transition-all duration-200
                        ${
                          isActive
                            ? "bg-[#1C2230] !text-[#EFE6D3]"
                            : "!text-[#1C2230]/70 hover:bg-[#D9CEB7] hover:!text-[#C41230]"
                        }
                        `
                      }
                    >
                      {category}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* ================= COUNTRY NEWS ================= */}
            <div>
              <button
                type="button"
                className="
                  flex w-full items-center justify-between
                  px-4 py-2.5
                  text-left
                  ncf-mono text-xs tracking-wider font-semibold
                  !text-[#1C2230]
                  border-b border-[#CFC2A7]
                  transition-all duration-200
                  hover:bg-[#D9CEB7]
                  hover:!text-[#C41230]
                "
                onClick={() => setShowCountries((show) => !show)}
                aria-expanded={showCountries}
              >
                <span className="!text-[#1C2230]">COUNTRY NEWS</span>

                <span className="text-xs !text-[#C41230]">
                  {showCountries ? "▲" : "▼"}
                </span>
              </button>

              {showCountries && (
                <div
                  className="
                  mt-1
                  max-h-64
                  space-y-0.5
                  overflow-auto
                  pl-3
                  border-l-2
                  border-[#C41230]
                "
                >
                  {countries.map((country) => (
                    <NavLink
                      key={country.iso_2_alpha}
                      to={`/country/${country.iso_2_alpha}`}
                      className={({ isActive }) =>
                        `
                        flex items-center gap-2 px-3 py-2
                        text-xs
                        transition-all duration-200
                        ${
                          isActive
                            ? "bg-[#1C2230] !text-[#EFE6D3]"
                            : "!text-[#1C2230]/70 hover:bg-[#D9CEB7] hover:!text-[#C41230]"
                        }
                        `
                      }
                    >
                      <img
                        src={country.png}
                        srcSet={`https://flagcdn.com/32x24/${country.iso_2_alpha}.png 2x`}
                        alt={country.countryName}
                        className="h-4 w-5 object-cover"
                      />

                      <span className="text-black">{country.countryName}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* ================= PUZZLE ================= */}
            <NavLink to="/puzzle" className={navClass}>
              PUZZLE
            </NavLink>

            {/* ================= NOTES ================= */}
            <NavLink to="/notes" className={navClass}>
              NOTES
            </NavLink>
          </div>

          {/* ================= SIDEBAR FOOTER ================= */}
          <div className="mt-8 pt-4 border-t border-[#CFC2A7]">
            <p
              className="
              ncf-mono
              text-[9px]
              tracking-[0.15em]
              !text-[#1C2230]/45
              leading-relaxed
            "
            >
              YOUR DAILY NEWS DESK
              <br />
              EVERY STORY · EVERY BORDER
            </p>
          </div>
        </div>
      </aside>

      {/* ================= CONTENT ================= */}
      <main className="min-w-0 flex-1 bg-[#EFE6D3]">
        <Outlet />
      </main>
    </div>
  );
}

export default NewsLayout;
