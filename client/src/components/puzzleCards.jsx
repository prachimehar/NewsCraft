import { Link } from "react-router-dom";

const PuzzleCard = ({ game }) => {
  return (
    <div className="group  text-black dark:text-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <img
        src={game.image}
        alt={game.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 group-hover:bg-purple-300 dark:group-hover:bg-indigo-700 transition-all duration-300">
        <h3 className="text-lg font-bold">{game.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {game.description}
        </p>
        <Link
          to={game.link}
          className="mt-4 bg-[#ff4D4D] inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md transition-all transform hover:scale-110 hover:shadow-lg active:scale-95"
        >
          Play Now
        </Link>
      </div>
    </div>
  );
};

export default PuzzleCard;
