import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import defaultImage from "../static/default_news_img.jpg";

import { useSearchResultContext } from '../contexts/SearchResultcontextProvider';
import { useImageResultContext } from '../contexts/ImageResultContextProvider';
import { useNewsResultContext } from '../contexts/NewsResultContextProvider';
import Loading from './Loading';

const Results = () => {

  const { searchResults, isLoading, getSearchResults, searchSearchterm, setSearchSearchTerm } = useSearchResultContext();
  const { getImageResults, imageResults, imageSearchTerm, setImageSearchTerm, isImageLoading } = useImageResultContext();
  const { getNewsResults, newsResults, newsSearchTerm, setNewsSearchTerm, isNewsLoading } = useNewsResultContext();
  const location = useLocation();

  
  useEffect(() => {
    getSearchResults(searchSearchterm);
    getImageResults(imageSearchTerm);
    getNewsResults(newsSearchTerm);
  }, [location.pathname, searchSearchterm, imageSearchTerm, newsSearchTerm]);

  if (isLoading) return <Loading />
  if (isImageLoading) return <Loading />
  if (isNewsLoading) return <Loading />
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
      return (
        <div className="sm:px-56 flex flex-wrap justify-between space-y-6 pt-10 items-center">
          {newsResults?.data?.map(({ title, link, photo_url, published_datetime_utc, source_url, source_logo_url, source_favicon_url }, index) => (
            <div key={index} className="w-full md:w-1/3 px-2 py-2">
              <a href={link} target="_blank" rel="noreferrer">
                <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl">
                  <img src={photo_url} onError={(e)=>{e.target.onerror = null; e.target.src= defaultImage}} alt={title} className="h-48 w-full object-cover" />
                  <div className="px-6 py-4">
                    <p className="text-sm text-gray-600 mb-2">{published_datetime_utc}</p>
                    <p className="text-xl hover:text-sky-800 hover:underline dark:text-gray-100 text-blue-700 font-bold mb-2">{title}</p>
                  </div>
                  <div className="px-6 py-4 flex justify-between items-center bg-gray-100 dark:bg-stone-900">
                    <div>
                      <img src={source_logo_url} alt="source logo" className="h-6 w-6 object-cover rounded-full" />
                    </div>
                    <div>
                      <img src={source_favicon_url} alt="source favicon" className="h-6 w-6 object-cover rounded-full" />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

      );

    case '/videos':
      return (
        <div className='flex flex-wrap'>

        </div>
      );

  
    default:
      return 'ERROR!'
  }
}

export default Results