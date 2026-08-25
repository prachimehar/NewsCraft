import { Link } from "react-router-dom";
import newsIcon from "../assets/newspapers.png";

const WIRE_HEADLINES = [
  "MARKETS — Global indices open higher on trade optimism",
  "SPORTS — India seal series win in final over thriller",
  "TECH — New chip architecture promises 40% efficiency gain",
  "WORLD — Diplomats reconvene for third round of talks",
  "HEALTH — Study links sleep patterns to long-term memory",
];

const SECTIONS = [
  {
    tag: "SECTION A",
    title: "Top Headlines, By Country",
    desc: "Pick India, the US, the UK, or any of 40+ editions — headlines re-sort instantly to match.",
  },
  {
    tag: "SECTION B",
    title: "The Live Wire",
    desc: "A running feed that updates as stories break, so the front page never goes stale.",
  },
  {
    tag: "SECTION C",
    title: "Puzzle Corner",
    desc: "A daily crossword, trivia set, and brain teaser — five minutes to reset between stories.",
  },
  {
    tag: "SECTION D",
    title: "Smart Notes",
    desc: "Highlight a line, jot a thought, and it's saved next to the article for whenever you're back.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Choose your section",
    desc: "Business, Sport, Technology, Health — start wherever the day takes you.",
  },
  {
    n: "02",
    title: "Set your edition",
    desc: "Filter by country to get the headlines that actually matter where you are.",
  },
  {
    n: "03",
    title: "Read, save, replay",
    desc: "Take notes as you go, and clear your head with a puzzle between articles.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-[#E4D8C0] text-[#1C2230] font-[Inter,sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bitter:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .ncf-display { font-family: 'Bitter', Georgia, serif; }
        .ncf-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

        @keyframes ncf-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ncf-ticker-track {
          animation: ncf-ticker 32s linear infinite;
        }
        .ncf-ticker-wrap:hover .ncf-ticker-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .ncf-ticker-track { animation: none; }
        }
      `}</style>

      {/* ---- WIRE TICKER ---- */}
      <div className="ncf-ticker-wrap w-full bg-[#1C2230] text-[#EFE6D3] overflow-hidden border-b-4 border-[#C41230]">
        <div className="flex items-center">
          <div className="flex items-center gap-2 shrink-0 px-4 py-2 bg-[#C41230] ncf-mono text-xs font-medium tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFE6D3] animate-pulse" />
            LIVE
          </div>
          <div className="relative flex-1 overflow-hidden py-2">
            <div className="ncf-ticker-track flex gap-10 whitespace-nowrap w-max">
              {[...WIRE_HEADLINES, ...WIRE_HEADLINES].map((h, i) => (
                <span
                  key={i}
                  className="ncf-mono text-xs sm:text-sm text-[#EFE6D3]/90"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---- MASTHEAD ---- */}
      <header className="w-full px-6 pt-12 pb-10 flex flex-col items-center text-center border-b border-[#D8C9A3]">
        <div className="flex items-center gap-3 mb-3">
          <img src={newsIcon} alt="NewsCraft" className="w-10 h-10 -rotate-6" />
          <span className="ncf-mono text-xs tracking-[0.25em] text-[#24476B] uppercase">
            Global Edition
          </span>
        </div>

        <h1 className="ncf-display text-5xl sm:text-7xl font-extrabold tracking-tight text-[#1C2230]">
          NewsCraft
        </h1>

        <div className="flex items-center gap-3 mt-4 ncf-mono text-xs sm:text-sm text-[#1C2230]/70 uppercase tracking-widest">
          <span>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#C41230]" />
          <span>Every Story, Every Border</span>
        </div>

        <p className="text-base sm:text-lg mt-6 max-w-xl text-[#1C2230]/75 leading-relaxed">
          Headlines from your country and every other, sorted by topic, paired
          with a puzzle break and a notebook — all on one desk.
        </p>

        <Link
          to="/all-news"
          className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-[#1C2230] text-[#EFE6D3] rounded-none font-semibold tracking-wide border-2 border-[#1C2230] hover:bg-[#EFE6D3] hover:text-[#1C2230] transition-colors duration-200"
        >
          Read Today&apos;s Wire <span aria-hidden>→</span>
        </Link>
      </header>

      {/* ---- CATEGORY / EDITION RAIL ---- */}
      <nav className="w-full px-6 py-4 flex flex-wrap items-center justify-center gap-2 border-b border-[#D8C9A3] bg-[#EFE6D3]/60">
        {[
          "World",
          "Business",
          "Technology",
          "Sports",
          "Health",
          "Entertainment",
        ].map((cat) => (
          <Link
            key={cat}
            to={`/all-news?category=${cat.toLowerCase()}`}
            className="px-4 py-1.5 text-sm font-medium text-[#1C2230]/80 border border-transparent hover:border-[#1C2230]/30 hover:text-[#C41230] transition-colors"
          >
            {cat}
          </Link>
        ))}
        <span className="w-px h-4 bg-[#D8C9A3] mx-2 hidden sm:block" />
        <Link
          to="/all-news?country=in"
          className="px-4 py-1.5 text-sm font-semibold text-[#24476B] hover:text-[#C41230] transition-colors"
        >
          India Edition ▾
        </Link>
      </nav>

      {/* ---- TODAY'S DESK (feature sections) ---- */}
      <section className="w-full px-6 py-16 max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-10 border-b-2 border-[#1C2230] pb-3">
          <h2 className="ncf-display text-3xl sm:text-4xl  text-[#1C2230]">
            Today&apos;s Desk
          </h2>

          <span className="ncf-mono text-xs text-[#1C2230]/50 uppercase tracking-widest hidden sm:block">
            Four Sections
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#D8C9A3] border border-[#D8C9A3]">
          {SECTIONS.map((s, index) => (
            <div
              key={index}
              className="bg-[#EFE6D3] p-8 flex flex-col hover:bg-[#1C2230] hover:text-[#EFE6D3] transition-colors duration-200 group"
            >
              <span className="ncf-mono text-xs tracking-[0.2em] text-[#C41230] mb-3">
                {s.tag}
              </span>

              {/* Heading: dark normally, white on hover */}
              <h3 className="ncf-display text-xl mb-2 text-[#1C2230] group-hover:text-[#EFE6D3]">
                {s.title}
              </h3>

              {/* Description: dark normally, white on hover */}
              <p className="text-sm leading-relaxed text-[#1C2230]/70 group-hover:text-[#EFE6D3]/75">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- HOW IT WORKS ---- */}
      <section className="w-full px-6 py-16 bg-[#1C2230] text-[#EFE6D3]">
        <div className="max-w-5xl mx-auto">
          <h2 className="ncf-display text-3xl sm:text-4xl font-bold mb-12 text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {STEPS.map((step, index) => (
              <div key={index} className="relative">
                <span className="ncf-mono text-4xl font-medium text-[#C41230]">
                  {step.n}
                </span>
                <h3 className="ncf-display text-lg font-bold mt-3 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#EFE6D3]/70 leading-relaxed">
                  {step.desc}
                </p>
                {index < STEPS.length - 1 && (
                  <span className="hidden md:block absolute top-3 -right-5 w-10 border-t border-[#EFE6D3]/25" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CLOSING CTA ---- */}
      <section className="w-full px-6 py-16 flex flex-col items-center text-center">
        <h2 className="ncf-display text-2xl sm:text-3xl max-w-xl leading-snug text-[#1C2230]">
          Your edition is set. Your notebook is empty. The wire is running.
        </h2>

        <Link
          to="/all-news"
          className="mt-8 inline-flex items-center gap-2 px-10 py-4 bg-[#C41230] text-[#EFE6D3] font-bold tracking-wide hover:bg-[#1C2230] transition-colors duration-200"
        >
          Explore Latest News <span aria-hidden>→</span>
        </Link>
      </section>

      {/* ---- FOOTER / COLOPHON ---- */}
      <footer className="w-full py-8 px-6 bg-[#1C2230] text-white flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="ncf-mono text-xs text-white tracking-wide">
          © 2026 NEWSCRAFT — PRINTED DAILY, POWERED BY DATA
        </p>

        <div className="flex gap-5 text-xs text-white">
          <Link
            to="/all-news"
            className="hover:text-[#C41230] transition-colors"
          >
            All News
          </Link>

          <span>Puzzles</span>
          <span>Notes</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
