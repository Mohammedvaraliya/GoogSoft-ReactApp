import React, { createContext, useContext, useState } from "react";

const VideoResultContext = createContext();
const baseUrl = 'https://bing-video-search1.p.rapidapi.com/videos';

export const VideoResultContextProvider = ({ children }) => {

    const [videoResults, setVideoResults] = useState([]);
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [videoSearchTerm, setVideoSearchTerm] = useState('musk');

    const getVideoResults = async (type, query = videoSearchTerm) => {
        setIsVideoLoading(true);
      
        const url = `${baseUrl}/${type = 'search'}?q=${query}`;
      
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_VIDEO_SEARCH_API_KEY,
            'X-RapidAPI-Host': 'bing-video-search1.p.rapidapi.com'
          }
        };
      
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          setVideoResults(data);
          console.log(data)
          setIsVideoLoading(false);
        } catch (error) {
          console.error(error);
          setIsVideoLoading(false);
        }
      };
      

    return (
        <VideoResultContext.Provider value={{ getVideoResults, videoResults, videoSearchTerm, setVideoSearchTerm, isVideoLoading }}>
            {children}
        </VideoResultContext.Provider>
    )

}

export const useVideoResultContext = () => useContext(VideoResultContext);
