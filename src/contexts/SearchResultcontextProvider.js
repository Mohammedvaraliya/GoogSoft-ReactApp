import React, { createContext, useContext, useState } from "react";

const SearchResultContext = createContext();
const baseUrl = 'https://google-search72.p.rapidapi.com';

export const ResultContextProvider = ({ children }) => {

    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchSearchTerm, setSearchSearchTerm] = useState('');

    const getSearchResults = async (type, query = searchSearchTerm) => {
        setIsLoading(true);
      
        const url = `${baseUrl}/${type}?query=${query}&gl=us&lr=en&num=10&start=0&sort=relevance`;
      
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'e1f101ee27mshbb6ef8d2daf5cb8p1bb381jsna7d4bfe0d350',
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
