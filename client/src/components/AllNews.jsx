import { useState, useEffect } from "react";
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";

function AllNews() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageSize = 12; // Keep this outside useEffect

  function handlePrev() {
    if (page > 1) setPage(page - 1);
  }

  function handleNext() {
    if (page < Math.ceil(totalResults / pageSize)) setPage(page + 1);
  }

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`https://news-aggregator-dusky.vercel.app/all-news?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((myJson) => {
        if (myJson.success) {
          setTotalResults(myJson.data.totalResults || 0);
          setData(myJson.data.articles || []);
        } else {
          setError(myJson.message || "An error occurred");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to fetch news. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  return (
    <>
      {error ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        </div>
      ) : (
        <div className="my-10 grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
          {isLoading ? <Loader /> : data.length > 0 ? (
            data.map((element, index) => (
              <EverythingCard
                key={index}
                title={element.title}
                description={element.description}
                imgUrl={element.urlToImage}
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.source.name}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg font-semibold">No news articles found.</p>
          )}
        </div>
      )}

      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button disabled={page <= 1} className="pagination-btn text-center" onClick={handlePrev}>
            &larr; Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.max(1, Math.ceil(totalResults / pageSize))}
          </p>
          <button
            className="pagination-btn text-center"
            disabled={page >= Math.ceil(totalResults / pageSize)}
            onClick={handleNext}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </>
  );
}

export default AllNews;
