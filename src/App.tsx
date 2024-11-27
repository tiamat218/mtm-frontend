import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppPage from './pages/App';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;