import React, { useEffect, useState } from 'react'
import Links from './Links'
import { useDebounce } from 'use-debounce'
import { useSearchResultContext } from '../contexts/SearchResultcontextProvider';
import { useImageResultContext } from '../contexts/ImageResultContextProvider';
import { useNewsResultContext } from '../contexts/NewsResultContextProvider';
import { useVideoResultContext } from '../contexts/VideoResultContextProvider';

const Search = () => {

  const [text, setText] = useState('Mukesh Ambani');
  const { setSearchSearchTerm } = useSearchResultContext();
  const { setImageSearchTerm } = useImageResultContext();
  const { setNewsSearchTerm } = useNewsResultContext();
  const { setVideoSearchTerm } = useVideoResultContext();
  const [ debouncedValue ] = useDebounce(text, 500);
  const setSearchTerms = (searchTerm) => {
    setSearchSearchTerm(searchTerm);
    setImageSearchTerm(searchTerm);
    setNewsSearchTerm(searchTerm);
    setVideoSearchTerm(searchTerm);
  };

  useEffect(() => {
      if(debouncedValue) setSearchTerms(debouncedValue);

  }, [debouncedValue])
  

  return (
    <div className='relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3'>
        <input 
            type="text"
            value={ text }
            className='sm:w-full w-80 h-10 dark:bg-gray-200  border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg'
            placeholder='Search GoogSoft or type url'
            onChange={(e) => setText(e.target.value)}
        />
        {text && (
        <button type="button" className="absolute top-1.5 right-4 text-2xl text-gray-500 " onClick={() => setText('')}>
          x
        </button>
        )}
        <Links />
    </div>
  )
}

export default Search