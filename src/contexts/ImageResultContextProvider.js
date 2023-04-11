import React, { createContext, useContext, useState } from "react";

const ImageResultContext = createContext();
const baseUrl = 'https://real-time-image-search.p.rapidapi.com';

export const ImageResultContextProvider = ({ children }) => {

    const [imageResults, setImageResults] = useState([]);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [imageSearchTerm, setImageSearchTerm] = useState('mohammed varaliya github');

    const getImageResults = async (type, query = imageSearchTerm) => {
        setIsImageLoading(true);
      
        const url = `${baseUrl}/${type = 'search'}?query=${query}&region=us`;
      
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_IMAGE_SEARCH_API_KEY,
            'X-RapidAPI-Host': 'real-time-image-search.p.rapidapi.com'
          }
        };
      
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          setImageResults(data);
          console.log(data)
          setIsImageLoading(false);
        } catch (error) {
          console.error(error);
          setIsImageLoading(false);
        }
      };
      

    return (
        <ImageResultContext.Provider value={{ getImageResults, imageResults, imageSearchTerm, setImageSearchTerm, isImageLoading }}>
            {children}
        </ImageResultContext.Provider>
    )

}

export const useImageResultContext = () => useContext(ImageResultContext);
