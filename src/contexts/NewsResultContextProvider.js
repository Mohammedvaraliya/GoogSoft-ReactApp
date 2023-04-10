import React, { createContext, useContext, useState } from "react";

const NewsResultContext = createContext();
const baseUrl = 'https://real-time-news-data.p.rapidapi.com';

export const NewsResultContextProvider = ({ children }) => {

    const [newsResults, setNewsResults] = useState([]);
    const [isNewsLoading, setIsNewsLoading] = useState(false);
    const [newsSearchTerm, setNewsSearchTerm] = useState('ambani adani');

    const getNewsResults = async (type, query = newsSearchTerm) => {
        setIsNewsLoading(true);
      
        const url = `${baseUrl}/${type = 'search'}?query=${query}&country=US&lang=en`;
      
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '0ee41472b4mshf05a667e36ff4d7p143f75jsn960ce06629a9',
            'X-RapidAPI-Host': 'real-time-news-data.p.rapidapi.com'
          }
        };
      
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          setNewsResults(data);
          console.log(data)
          setIsNewsLoading(false);
        } catch (error) {
          console.error(error);
          setIsNewsLoading(false);
        }
      };
      

    return (
        <NewsResultContext.Provider value={{ getNewsResults, newsResults, newsSearchTerm, setNewsSearchTerm, isNewsLoading }}>
            {children}
        </NewsResultContext.Provider>
    )

}

export const useNewsResultContext = () => useContext(NewsResultContext);
