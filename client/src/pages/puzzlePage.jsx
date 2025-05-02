import React from "react";
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
import hangmanImg from "/src/assets/Hangman.jpg";z
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
    description: "Guess a five-letter word in six attempts with feedback on letter placement.",
    image: WordleImg, 
    link: "https://www.nytimes.com/games/wordle/index.html",
  },
  {
    title: "Scrabble",
    description: "Create words with letter tiles for points.",
    image: scrabbleImg,
    link: "https://www.pogo.com/games/scrabble"
  },
  {
    title: "Hangman",
    description: "Guess the word before you run out of chances.",
    image: hangmanImg,
    link: "https://www.hangmanwords.com/play"
  },
  {
    title: "Reversi (Othello)",
    description: "Flip opponent’s pieces to take over the board.",
    image: reversiImg,
    link: "https://cardgames.io/reversi/"
  }
  
];

const PuzzlePage = () => {
  return (
    <div className="container  mx-auto p-6">
      <h1 className="text-center text-3xl font-bold mb-6"></h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {puzzleGames.map((game, index) => (
          <PuzzleCard key={index} game={game} />
        ))}
      </div>
    </div>
  );
};

export default PuzzlePage;
