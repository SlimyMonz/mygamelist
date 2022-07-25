import React from 'react';
import './App.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import GamePage from './pages/GamePage';
import MainPage from './pages/MainPage';
import AboutPage from './pages/About';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" index element={<MainPage />} />
          <Route path="/games" index element={<GamePage />} />
          <Route path="/about" index element={<AboutPage/>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
