/* eslint-disable react/prop-types */

function Card(props) {
  const metadata = [props.country, props.category]
    .filter(Boolean)
    .join(" | ");

  return (
    <article className="mt-8 bg-[#F5EEDF] border border-[#D8C9A3] shadow-[0_5px_15px_rgba(28,34,48,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(28,34,48,0.15)] transition-all duration-300">

      {/* ================= MAIN NEWS CARD ================= */}
      <div className="p-5">

        {/* Category / metadata */}
        {metadata && (
          <div className="mb-3">
            <span className="ncf-mono text-[10px] tracking-[0.2em] uppercase text-[#C41230]">
              {metadata}
            </span>
          </div>
        )}

        {/* Title */}
        <h2 className="ncf-display text-xl sm:text-2xl font-bold leading-tight text-[#000000] mb-4">
          {props.title}
        </h2>

        {/* Image */}
        {props.imgUrl && (
          <div className="w-full h-48 sm:h-56 overflow-hidden mb-4">
            <img
              src={props.imgUrl}
              alt={props.title || "News image"}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Description */}
        {props.description && (
          <p className="text-sm sm:text-base leading-7 text-[#1C2230]/75 mb-5">
            {props.description.substring(0, 200)}
            {props.description.length > 200 ? "..." : ""}
          </p>
        )}

        {/* Editorial divider */}
        <div className="flex items-center gap-2 mb-5">
          <span className="h-[2px] w-8 bg-[#C41230]" />
          <span className="h-px flex-1 bg-[#D8C9A3]" />
        </div>

        {/* ================= INFO ================= */}
        <div className="space-y-2 text-sm text-[#1C2230]">

          {/* Source */}
          <div className="flex items-start gap-2">
            <span className="font-semibold text-black">
              Source:
            </span>

            <a
              href={props.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C41230] underline break-words hover:text-[#1C2230] transition-colors"
            >
              {(props.source || "Unknown").substring(0, 70)}
            </a>
          </div>

          {/* Country / Category */}
          {metadata && (
            <p className="text-[#000000]">
              <span className="font-semibold text-black">
                Scope:
              </span>{" "}
              {metadata}
            </p>
          )}

          {/* Author */}
          <p className="text-[#000000]">
            <span className="font-semibold text-black">
              Author:
            </span>{" "}
            {props.author || "Unknown"}
          </p>

          {/* Published */}
          <p className="text-[#000000]">
            <span className="font-semibold text-black">
              Published:
            </span>{" "}
            {props.publishedAt || "Unknown"}
          </p>

        </div>
      </div>

      {/* ================= SECONDARY CARD CONTENT ================= */}
      {(props.imageUrlLeft ||
        props.cardTitle ||
        props.cardDescription ||
        props.authorName) && (
        <div className="border-t border-[#D8C9A3]">

          <div className="flex flex-col lg:flex-row">

            {/* Left Image */}
            {props.imageUrlLeft && (
              <div
                className="h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center overflow-hidden"
                style={{
                  backgroundImage: `url(${props.imageUrlLeft})`,
                }}
                title={props.imageLeftTitle}
              />
            )}

            {/* Content */}
            <div className="p-5 flex flex-col justify-between leading-normal flex-1">

              <div className="mb-6">

                {/* Member info */}
                {props.memberText && (
                  <p className="text-xs flex items-center text-[#1C2230]/55 mb-2">
                    {props.memberIcon && (
                      <svg
                        className="fill-current text-[#C41230] w-3 h-3 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        {props.memberIcon}
                      </svg>
                    )}

                    {props.memberText}
                  </p>
                )}

                {/* Card title */}
                {props.cardTitle && (
                  <h3 className="ncf-display font-bold text-xl text-[#000000] mb-2">
                    {props.cardTitle}
                  </h3>
                )}

                {/* Card description */}
                {props.cardDescription && (
                  <p className="text-sm leading-6 text-[#1C2230]/70">
                    {props.cardDescription}
                  </p>
                )}
              </div>

              {/* Author */}
              {(props.authorImage ||
                props.authorName ||
                props.publishedDate) && (
                <div className="flex items-center border-t border-[#D8C9A3] pt-4">

                  {props.authorImage && (
                    <img
                      className="w-10 h-10 rounded-full mr-4 object-cover"
                      src={props.authorImage}
                      alt={props.authorName || "Author"}
                    />
                  )}

                  <div className="text-xs">
                    {props.authorName && (
                      <p className="font-semibold text-[#000000]">
                        {props.authorName}
                      </p>
                    )}

                    {props.publishedDate && (
                      <p className="text-[#1C2230]/55 mt-1">
                        {props.publishedDate}
                      </p>
                    )}
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </article>
  );
}

export default Card;