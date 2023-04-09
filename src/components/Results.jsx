import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useSearchResultContext } from '../contexts/SearchResultcontextProvider';
import { useImageResultContext } from '../contexts/ImageResultContextProvider';
import Loading from './Loading';

const Results = () => {

  const { searchResults, isLoading, getSearchResults, searchSearchterm, setSearchSearchTerm } = useSearchResultContext();
  const { getImageResults, imageResults, imageSearchTerm, setImageSearchTerm, isImageLoading } = useImageResultContext();
  const location = useLocation();

  
  useEffect(() => {
    getSearchResults(location.pathname, searchSearchterm);
    getImageResults('search', imageSearchTerm);
  }, [searchSearchterm, location.pathname, searchSearchterm]);

  if (isLoading) return <Loading />
  if (isImageLoading) return <Loading />
  console.log(location.pathname)


  

  switch (location.pathname) {
    case '/search':
      return (
        <div className="sm:px-56 flex flex-wrap justify-between space-y-6 pt-10">
          {searchResults?.items?.map(({ link, title, snippet }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">{link.length > 30 ? link.substring(0, 30) : link}</p>
                <p className="text-xl hover:text-sky-800 hover:underline dark:text-blue-300 text-blue-700">{title}</p>
                <p className="text-base text-gray-950 dark:text-gray-100">{snippet}</p>
              </a>
            </div>
          ))}
        </div>
      );

    case '/images':
      return (
        <div className="flex flex-wrap justify-center items-center">
          {imageResults?.data?.map(({ id, title, url, thumbnail_url, width, height }, index) => (
            <a href={url} target="_blank" key={id} rel="noreferrer" className="sm:p-3 p-5">
              <div className="w-66 h-66 bg-gray-200 rounded-lg overflow-hidden relative">
                <img src={thumbnail_url} alt={title} className="object-cover h-full w-full" />
              </div>
              <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>

      );

    case '/news':
      return 'NEWS';

    case '/videos':
      return 'VIDEOS';

  
    default:
      return 'ERROR!'
  }
}

export default Results