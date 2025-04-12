import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EverythingCard from './Card';
import Loader from './Loader';

function TopHeadlines() {
    const { category } = useParams();  // Ensure useParams is used here
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const pageSize = 6;

    const handlePrev = () => {
        setPage(page - 1);
    };

    const handleNext = () => {
        setPage(page + 1);
    };

    useEffect(() => {
        setIsLoading(true);
        const categoryParam = category ? `&category=${category}` : '';
        
        fetch(`http://localhost:3000/top-headlines?language=en${categoryParam}&pageSize=${pageSize}&page=${page}`)
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch');
                return response.json();
            })
            .then(myJson => {
                if (myJson.success) {
                    setTotalResults(myJson.data.totalResults);
                    setData(myJson.data.articles);
                } else {
                    console.error(myJson.message || 'An error occurred');
                }
            })
            .catch(error => console.error('Fetch error:', error))
            .finally(() => setIsLoading(false));
    }, [page, category]);

    return (
        <>
            <div className="my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
                {!isLoading
                    ? data.length > 0
                        ? data.map((element, index) => (
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
                        : <p>No articles found for this category or criteria.</p>
                    : <Loader />}
            </div>
            {!isLoading && data.length > 0 && (
                <div className="pagination flex justify-center gap-14 my-10 items-center">
                    <button disabled={page <= 1} className="pagination-btn text-center" onClick={handlePrev}>
                        &larr; Prev
                    </button>
                    <p className="font-semibold opacity-80">
                        {page} of {Math.ceil(totalResults / pageSize)}
                    </p>
                    <button className="pagination-btn text-center" disabled={page >= Math.ceil(totalResults / pageSize)} onClick={handleNext}>
                        Next &rarr;
                    </button>
                </div>
            )}
        </>
    );
}

export default TopHeadlines;
