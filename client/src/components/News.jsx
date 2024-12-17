import { React, useState, useEffect } from 'react';
import EverythingCard from './Card';
import Loader from './Loader';

function News(){
    const [data, setdata] = useState([]);
    const [page, setpage] = useState(1);
    const [totalResult, settotalResult] = useState(0);
    const [isLoading, setisLoading] = useState(false);

    function headlePrev(){
        setpage(page-1);
    }

    function headleNext(){
        setpage(page+1);
    }
    
    let pageSize = 6;
    useEffect(() => {
      fetch(`http://localhost:3000/all-news?page=${page}&pageSize=${pageSize}`)
      .then(response => {
        if (response.ok) {
            setisLoading(true)
            return response.clone().json();
        }
      })
      .then(myJson => {
        if (myJson.success) {
          settotalResult(myJson.data.totalResults);
          setdata(myJson.data.articles);
        } else {
          setError(myJson.message || 'An error occurred');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError('Failed to fetch news. Please try again later.');
      })
      .finally(() => {
        setisLoading(false);
      });
    }, [page]);

    return(
        <>
        <div className='my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 '>
        {!isLoading ? data.map((element, index) => (
          <Card
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
          <p className='font-semibold opacity-80'>{page} of {Math.ceil(totalResults / 15)}</p>
          <button className='pagination-btn text-center' disabled={page >= Math.ceil(totalResults / 15)} onClick={handleNext}>Next &rarr;</button>
        </div>
      )}
       

      </>
    )
    
}

export default News;