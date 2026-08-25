import PuzzleCard from "../components/puzzleCards";

import sudokuImg from "/src/assets/sudoku.jpg";
import wordSearchImg from "/src/assets/word-search.jpg";
import chessImg from "/src/assets/chess.jpg";
import memoryImg from "/src/assets/MemoryGame.jpg";
import jigsawImg from "/src/assets/JigsawPuzzle.jpg";
import minesweeperImg from "/src/assets/Minesweeper.jpg";
import slidingPuzzleImg from "/src/assets/SlidingPuzzle.jpg";
import crosswordImg from "/src/assets/Crossword.jpg";
import scrabbleImg from "/src/assets/Scrabble.jpg";
import hangmanImg from "/src/assets/Hangman.jpg";
import reversiImg from "/src/assets/Reversi.jpg";
import WordleImg from "/src/assets/Wordle.png";

const puzzleGames = [
  {
    title: "Sudoku",
    description: "Test your logic skills with this number-based puzzle.",
    image: sudokuImg,
    link: "https://sudoku.com/",
  },
  {
    title: "Word Search",
    description: "Find hidden words in a grid of letters.",
    image: wordSearchImg,
    link: "https://thewordsearch.com/",
  },
  {
    title: "Chess",
    description: "Play a strategic game of chess.",
    image: chessImg,
    link: "https://www.chess.com/",
  },
  {
    title: "Memory Game",
    description: "Match pairs of cards to test your memory.",
    image: memoryImg,
    link: "https://www.helpfulgames.com/subjects/brain-training/memory.html",
  },
  {
    title: "Minesweeper",
    description: "Uncover safe tiles and avoid the mines!",
    image: minesweeperImg,
    link: "https://cardgames.io/minesweeper/",
  },
  {
    title: "Jigsaw Puzzle",
    description: "Rearrange pieces to complete the picture.",
    image: jigsawImg,
    link: "https://www.jigsawplanet.com/",
  },
  {
    title: "Sliding Puzzle",
    description: "Rearrange tiles to form a complete image.",
    image: slidingPuzzleImg,
    link: "https://slidingtiles.com/en#google_vignette",
  },
  {
    title: "Crossword",
    description: "Solve word puzzles by filling in the blanks.",
    image: crosswordImg,
    link: "https://artsandculture.google.com/experiment/cultural-crosswords/JgGaXxGHVxpn4A?hl=en",
  },
  {
    title: "Wordle",
    description:
      "Guess a five-letter word in six attempts with feedback on letter placement.",
    image: WordleImg,
    link: "https://www.nytimes.com/games/wordle/index.html",
  },
  {
    title: "Scrabble",
    description: "Create words with letter tiles for points.",
    image: scrabbleImg,
    link: "https://www.pogo.com/games/scrabble",
  },
  {
    title: "Hangman",
    description: "Guess the word before you run out of chances.",
    image: hangmanImg,
    link: "https://www.hangmanwords.com/play",
  },
  {
    title: "Reversi (Othello)",
    description: "Flip opponent’s pieces to take over the board.",
    image: reversiImg,
    link: "https://cardgames.io/reversi/",
  },
];

const PuzzlePage = () => {
  return (
    <div className="min-h-screen bg-[#EFE6D3] text-[#1C2230] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="border-b-2 border-[#1C2230] pb-4 mb-8">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">

            <div>
              <p className="ncf-mono text-xs tracking-[0.25em] text-[#C41230] mb-2">
                SECTION C
              </p>

              <h1 className="ncf-display text-4xl sm:text-5xl font-bold text-[#1C2230]">
                Puzzle Corner
              </h1>
            </div>

            <p className="ncf-mono text-[10px] tracking-widest text-[#1C2230]/50 uppercase">
              Take a break from the wire
            </p>

          </div>

        </div>

        {/* ================= INTRO ================= */}
        <div className="max-w-2xl mb-10">

          <p className="text-sm sm:text-base text-[#1C2230]/70 leading-relaxed">
            Step away from the headlines and give your brain a quick workout.
            Choose from classic puzzles, strategy games, word challenges, and memory tests.
          </p>

        </div>

        {/* ================= PUZZLE GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {puzzleGames.map((game, index) => (
            <div
              key={index}
              className="
                bg-[#F5EEDF]
                border border-[#D8C9A3]
                shadow-md
                transition-all duration-200
                hover:-translate-y-1
                hover:shadow-xl
                hover:border-[#1C2230]/50
              "
            >
              <PuzzleCard game={game} />
            </div>
          ))}

        </div>

        {/* ================= FOOTER LINE ================= */}
        <div className="mt-12 pt-5 border-t border-[#D8C9A3] flex flex-col sm:flex-row justify-between gap-2">

          <p className="ncf-mono text-[10px] tracking-widest text-[#1C2230]/40">
            PUZZLE DESK · NEWSCRAFT
          </p>

          <p className="ncf-mono text-[10px] tracking-widest text-[#1C2230]/40">
            {puzzleGames.length} GAMES AVAILABLE
          </p>

        </div>

      </div>
    </div>
  );
};

export default PuzzlePage;