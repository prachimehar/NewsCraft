import React from 'react';

function Card(props) {
  return (
    <div className="everything-card mt-10">
      <div className="everything-card flex-wrap p-5 gap-1 mb-1">
        <b className="title">{props.title}</b>
        <div className="everything-card-img">
          <img src={props.imgUrl} alt="News" />
        </div>
      </div>

      <div className="description">
        <p>{props.description?.substring(0, 200)}</p>
      </div>

      <div className="info">
        <div className="source-info flex items-center gap-2">
          <span className="font-semibold">Source:</span>
          <a
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link underline break-word"
          >
            {props.source?.substring(0, 70) || "N/A"}
          </a>
        </div>
      </div>

      <div className="origin flex flex-col">
        <p className="origin-item">
          <span className="font-semibold">Author:</span> {props.author || "Unknown"}
        </p>
        <p className="origin-item">
          <span className="font-semibold">Published At:</span> {props.publishedAt || "Unknown"}
        </p>
      </div>
    </div>
  );
}

export default Card;
