import { React, useState, useEffect } from 'react';
import EverythingCard from './Card';
import Loader from './Loader';
import { useParams } from 'react-router-dom';


function CountryNews(){
    const params = useParams();
    const [data, setdata] = useState([]);
    const [page, setpage] = useState(1);
    const [totalResult, settotalResult] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    function handlePrev() {
        setpage(page - 1);
    }
    
    function handleNext() {
        setpage(page + 1);
    }
    
    useEffect(() => {
        setIsLoading(true);
        fetch(
            `http://localhost:3000/country/${params.iso}?pageSize=${pageSize}&apiKey=${API_KEY}`

        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error("Failed to fetch data:", response.statusText);
                    setIsLoading(false);
                    return null;
                    
                }
            })
            .then((myJson) => {
                if (myJson) {
                    settotalResult(myJson.data.totalResults);
                    setdata(myJson.data.articles);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setIsLoading(false);
            });
    }, [page, params.iso]);
    

    return(
        <>
        <div className='my-10 cards grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3 '>
        {!isLoading ? (
          data.length > 0 ? (
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
            <p>No articles found for this category or criteria.</p>
          )
        ) : (
          <Loader />
        )}
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

export default CountryNews;