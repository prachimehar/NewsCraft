import { React, useState, useEffect } from 'react';
import EverythingCard from './Card';
import Loader from './Loader';

function News() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // Added missing state

    function handlePrev() {
        setPage(prevPage => prevPage - 1);
    }

    function handleNext() {
        setPage(prevPage => prevPage + 1);
    }
    
    let pageSize = 6;
    
    useEffect(() => {
        setIsLoading(true);
        setError(null);
        
        fetch(`http://localhost:3000/all-news?page=${page}&pageSize=${pageSize}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch news');
                }
                return response.json();
            })
            .then(myJson => {
                if (myJson.success) {
                    setTotalResults(myJson.data.totalResults);
                    setData(myJson.data.articles);
                } else {
                    setError(myJson.message || 'An error occurred');
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setError('Failed to fetch news. Please try again later.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [page]);

    return (
        <>
            {error && <p className='text-red-500 text-center'>{error}</p>}
            <div className='my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 '>
                {!isLoading ? data.map((element, index) => (
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
                )) : <Loader />}
            </div>
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

export default News;