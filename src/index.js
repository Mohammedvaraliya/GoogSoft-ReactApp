import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ResultContextProvider } from './contexts/SearchResultcontextProvider';
import { ImageResultContextProvider } from './contexts/ImageResultContextProvider';
import { NewsResultContextProvider } from './contexts/NewsResultContextProvider';
import { VideoResultContextProvider } from './contexts/VideoResultContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ResultContextProvider>
    <ImageResultContextProvider>
      <NewsResultContextProvider>
        <VideoResultContextProvider>
          <React.StrictMode>
            <HashRouter>
              <Routes>
                <Route path="*" element={<App />}>
                </Route>
              </Routes>
            </HashRouter>
          </React.StrictMode>
        </VideoResultContextProvider>
      </NewsResultContextProvider>
    </ImageResultContextProvider>
  </ResultContextProvider>
);
