import React, { createContext, useContext, useState } from "react";

const ImageResultContext = createContext();
const baseUrl = 'https://real-time-image-search.p.rapidapi.com';

export const ImageResultContextProvider = ({ children }) => {

    const [imageResults, setImageResults] = useState([]);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [imageSearchTerm, setImageSearchTerm] = useState('mohammed varaliya github');

    const getImageResults = async (type, query = imageSearchTerm) => {
        setIsImageLoading(true);
      
        const url = `${baseUrl}/${type}?query=${query}&region=us`;
      
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '0ee41472b4mshf05a667e36ff4d7p143f75jsn960ce06629a9',
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
