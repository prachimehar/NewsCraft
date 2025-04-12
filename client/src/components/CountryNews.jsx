import { useState, useEffect } from 'react';
import EverythingCard from './Card';
import Loader from './Loader';

function CountryNews({ country }) {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const pageSize = 6;  // ✅ Define pageSize before using it

    function handlePrev() {
        if (page > 1) setPage(page - 1);
    }

    function handleNext() {
        if (page < Math.ceil(totalResults / pageSize)) setPage(page + 1);
    }

    useEffect(() => {
      setIsLoading(true);
      setError(null);
  
      fetch(`http://localhost:3000/country-news?country=${country}&page=${page}&pageSize=${pageSize}`)
          .then(response => {
              if (!response.ok) throw new Error('Failed to fetch news');
              return response.json();
          })
          .then(myJson => {
              console.log("🟢 API Response:", myJson);  // ✅ Debugging log
              if (myJson.success) {
                  setTotalResults(myJson.data.totalResults || 0);
                  setData(myJson.data.articles || []);
              } else {
                  throw new Error(myJson.message || 'An error occurred');
              }
          })
          .catch(error => {
              console.error('🔴 Fetch error:', error);
              setError(error.message);
          })
          .finally(() => setIsLoading(false));
  }, [page, country]);
  

    return (
        <>
            {/* Error Message */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* News Cards */}
            <div className='my-10 grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 '>
                {!isLoading ? (
                    data.length > 0 ? data.map((element, index) => (
                        <EverythingCard
                            title={element.title}
                            description={element.description}
                            imgUrl={element.urlToImage}
                            publishedAt={element.publishedAt}
                            url={element.url}
                            author={element.author}
                            source={element.source.name}
                            key={index}
                        />
                    )) : <p className="text-center">No news articles found.</p>
                ) : <Loader />}
            </div>

            {/* Pagination */}
            {!isLoading && data.length > 0 && (
                <div className="pagination flex justify-center gap-14 my-10 items-center">
                    <button disabled={page <= 1} className='pagination-btn text-center' onClick={handlePrev}>&larr; Prev</button>
                    <p className='font-semibold opacity-80'>{page} of {Math.ceil(totalResults / pageSize)}</p>
                    <button className='pagination-btn text-center' disabled={page >= Math.ceil(totalResults / pageSize)} onClick={handleNext}>Next &rarr;</button>
                </div>
            )}
        </>
    );
}

export default CountryNews;
