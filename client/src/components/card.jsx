import React from 'react';

function Card(props) {
  // Function to format the date properly
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="news-card mt-10 p-5 shadow-lg rounded-lg border border-gray-200">
      {/* Title */}
      <b className="title text-lg font-bold">{props.title || "No Title Available"}</b>

      {/* News Image */}
      <div className="news-card-img my-3">
        <img
          src={props.imgUrl || "https://via.placeholder.com/300"}  // Default placeholder image
          alt="News"
          className="w-full h-48 object-cover rounded-md"
        />
      </div>

      {/* Description */}
      <div className="description">
        <p>{props.description?.substring(0, 200) || "No description available"}...</p>
      </div>

      {/* Source Info */}
      <div className="source-info flex items-center gap-2 my-2">
        <span className="font-semibold">Source:</span>
        <a
          href={props.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline truncate"
        >
          {props.source?.substring(0, 70) || "N/A"}
        </a>
      </div>

      {/* Author & Published Date */}
      <div className="origin flex flex-col">
        <p className="origin-item">
          <span className="font-semibold">Author:</span> {props.author || "Unknown"}
        </p>
        <p className="origin-item">
          <span className="font-semibold">Published At:</span> {formatDate(props.publishedAt)}
        </p>
      </div>
    </div>
  );
}

export default Card;

