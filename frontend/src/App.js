import React from 'react';
import './App.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import GamesPage from './pages/GamesPage';
import MainPage from './pages/MainPage';
import AboutPage from './pages/About';
import GamePage from './pages/GamePage';
import MyListPage from './pages/MyListPage';
import PasswordResetPage from './pages/PasswordResetPage';


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<MainPage />} />
          <Route path="/about" index element={<AboutPage/>} />
          <Route path="/games" index element={<GamesPage />} />
          <Route path="/mylist" index element={<MyListPage />} />
          <Route path="/games/:gameName" element={<GamePage />}/>
          <Route path="/passwordReset" element={<PasswordResetPage />}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
