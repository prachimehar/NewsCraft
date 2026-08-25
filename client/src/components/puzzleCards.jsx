/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const PuzzleCard = ({ game }) => {
  return (
    <div className="group bg-[#F5EEDF] text-[#1C2230] overflow-hidden transition-all duration-200 hover:-translate-y-1">

      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5 border-t border-[#D8C9A3]">

        {/* Section label */}
        <p className="ncf-mono text-[10px] tracking-[0.2em] text-[#C41230] uppercase mb-2">
          PUZZLE
        </p>

        {/* Title */}
        <h3 className="ncf-display text-xl font-bold text-[#1C2230] mb-2">
          {game.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#1C2230]/65 leading-relaxed min-h-[42px]">
          {game.description}
        </p>

        {/* Play button */}
        <Link
          to={game.link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-5
            inline-flex
            items-center
            justify-center
            gap-2
            px-5
            py-2
            bg-[#C41230]
            text-[#EFE6D3]
            font-semibold
            text-sm
            tracking-wide
            transition-all
            duration-200
            hover:bg-[#1C2230]
          "
        >
          Play Now
          <span>→</span>
        </Link>

      </div>
    </div>
  );
};

export default PuzzleCard;