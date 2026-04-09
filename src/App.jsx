import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <footer className="bg-smoke-900 text-stone-300 py-8 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-sm">
            mycool.rocks © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;