import React, { createContext, useContext, useState } from "react";

const SearchResultContext = createContext();
const baseUrl = 'https://google-search72.p.rapidapi.com';

export const ResultContextProvider = ({ children }) => {

    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchSearchTerm, setSearchSearchTerm] = useState('mohammed varaliya github');

    const getSearchResults = async (type, query = searchSearchTerm) => {
        setIsLoading(true);
      
        const url = `${baseUrl}${type = '/search'}?query=${query}&gl=us&lr=en&num=10&start=0&sort=relevance`;
      
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_GOOGLE_SEARCH_API_KEY,
            'X-RapidAPI-Host': 'google-search72.p.rapidapi.com'
          }
        };
      
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          setSearchResults(data);
          console.log(data)
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      };
      

    return (
        <SearchResultContext.Provider value={{ getSearchResults, searchResults, searchSearchTerm, setSearchSearchTerm, isLoading }}>
            {children}
        </SearchResultContext.Provider>
    )

}

export const useSearchResultContext = () => useContext(SearchResultContext);
