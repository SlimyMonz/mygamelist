import React from 'react';
import './App.css';
import image from './green.jpg';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import GamesPage from './pages/GamesPage';
import MainPage from './pages/MainPage';
import GamePage from './pages/GamePage';


function App() {

  return (
    <div style={{ backgroundImage:`url(${image})`,backgroundSize: 'contain' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<MainPage />} />
          <Route path="/games" index element={<GamesPage />} />
          <Route path="/games/:gameName" element={<GamePage />}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
