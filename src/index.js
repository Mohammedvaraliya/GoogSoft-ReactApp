import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ResultContextProvider } from './contexts/SearchResultcontextProvider';
import { ImageResultContextProvider } from './contexts/ImageResultContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ResultContextProvider>
    <ImageResultContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
    </ImageResultContextProvider>
  </ResultContextProvider>
);
