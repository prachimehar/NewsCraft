import  { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import EverythingCard from './EverythingCard'
import Loader from "./Loader";
import { fetchNews } from "../newsApi";

function TopHeadlines() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handlePrev() {
    setPage(prev => prev - 1);
  }

  function handleNext() {
    setPage(prev => prev + 1);
  }

  const pageSize = 6;

  useEffect(() => {
    setPage(1);
  }, [params.category]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const categoryParam = params.category ? `&category=${params.category}` : "";

        const json = await fetchNews(
          `/api/news?country=in${categoryParam}&page=${page}&pageSize=${pageSize}`
        );

        if (json.success) {
          setTotalResults(json.data.totalResults || 0);
          setData(json.data.articles || []);
        } else {
          setError(json.message || "An error occurred");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch news. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, params.category]);

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className='my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 '>
        {!isLoading ? (
          data.length > 0 ? (
            data.map((element, index) => (
              <EverythingCard
                key={index}
                title={element.title}
                description={element.description}
                imgUrl={element.imageUrl}
                publishedAt={element.publishedAt}
                url={element.url}
                author={element.author}
                source={element.sourceName}
                country={element.country}
                category={element.category}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">
              No headlines are available for this country/category right now.
              Try a different country or category.
            </p>
          )
        ) : (
          <Loader />
        )}
      </div>
      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button disabled={page <= 1} className='pagination-btn' onClick={handlePrev}>Prev</button>
          <p className='font-semibold opacity-80'>{page} of {Math.ceil(totalResults / pageSize)}</p>
          <button className='pagination-btn' disabled={page >= Math.ceil(totalResults / pageSize)} onClick={handleNext}>Next</button>
        </div>
      )}
    </>
  );
}

export default TopHeadlines;
